var myapp = angular.module("myapp",['ngRoute']);

myapp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'views/template/user.html',
  })
  .when('/Users', {
        templateUrl : 'views/template/user.html',
        controller: 'AppCtrl'
    })
    .when('/Albums', {
        templateUrl : 'views/template/albums.html',
        controller: 'albumctrl'
    })
    .when('/Photos', {
        templateUrl : 'views/template/photos.html',
        controller: 'photosctrl'
    })
    .when('/allalbum', {
      templateUrl : 'views/template/allalbums.html',
      controller: 'photosctrl'
  })
    .when('/Albums/:UserId', {
        templateUrl : 'views/template/allalbums.html',
        controller: 'albumctrl'
    })
    .when('/photoalbum', {
      templateUrl : 'views/template/allphotos.html',
      controller: 'photosctrl'
    })
    .when('/Photos/:AlbumId', {
        templateUrl : 'views/template/allphotos.html',
        controller: 'photosctrl'
    })
    .otherwise({
        redirectTo : '/',
      })
});

myapp.controller('AppCtrl', ['$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
    // $http.get('/getusers').then(function(response) {
    //     $scope.users = response.data;
    //     console.log($scope.users);
    //   });

var refresh = function() {
    $http.get('/getusers').then(function(response) {
      $rootScope.users = response.data;
      console.log($rootScope.users);
    
    });
  };
  refresh();

    $scope.saveuser = function() {
    $http.post('/adduser', $scope.user).then(function(response) {
        refresh();
    });
  };
  $scope.edituser = function(UserId) {
    console.log(UserId);
    $http.get('/getbyuserid/' + UserId).then(function(response) {
      $scope.user = response.data;
    });
  };  
  
$scope.updateuser = function() {
    console.log($scope.user.UserId);
    $http.post('/updateuser/' + $scope.user.UserId, $scope.user).then(function(response) {
      refresh();
    })
  };
$scope.deleteuser = function(UserId) {
    console.log(UserId);
    $http.delete('/deleteuserdata/' + UserId).then(function(response) {
      refresh();
    });
  };
}]);


// album ctrll***********
// album ctrll***********
// album ctrll***********

  
myapp.controller('albumctrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/getalbumuser').then(function(response) {
      $scope.myuser = response.data;
      console.log($scope.myuser);
    });
    $http.get('/getalbum').then(function(response) {
      $scope.albums = response.data;
      console.log($scope.albums);
    });
var refreshalbum = function() {
    $http.get('/getalbum').then(function(response) {
      $scope.albums = response.data;
      console.log($scope.albums);
    });
  };
  refreshalbum();

    $scope.savealbum = function(User) {
    console.log($scope.album);
    $http.post('/addalbum/'+ User, $scope.album).then(function(response) {
        console.log(response);
        refreshalbum();
    });
  };
  $scope.editalbum = function(AlbumId) {
    console.log(AlbumId);
    $http.get('/getbyalbumid/' + AlbumId).then(function(response) {
      $scope.album = response.data;
      console.log($scope.album)
    });
  };  
  
$scope.updatealbum = function() {
    console.log($scope.album);
    $http.post('/updatealbum/' + $scope.album.AlbumId, $scope.album).then(function(response) {
      refreshalbum();
    })
  };
$scope.deletealbum = function(AlbumId) {
    $http.delete('/deletealbumdata/' + AlbumId).then(function(response) {
        refreshalbum();
    });
  };
}]);  

// album ctrll***********


// photos ctrll***********
// photos ctrll***********START
// photos ctrll***********
 
myapp.controller('photosctrl', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
  $http.get('/getalbumuser').then(function(response) {
    $scope.myuser = response.data;
  });
  $http.get('/getalbum').then(function(response) {
    $scope.albums = response.data;
  });
  $http.get('/getphotos').then(function(response) {
    $scope.Photos = response.data;
  });

  $http.get('/Photos/'+ $routeParams.AlbumId).then(function(response) {
    $scope.MyPhotos = response.data;
  });
  

var refreshphotos = function() {
  $http.get('/getphotos').then(function(response) {
    $scope.Photos = response.data;
  });
};
refreshphotos();
     
$scope.upload = function(Photo){
         console.log( $scope.Photo.User);
      $scope.Photo1 = angular.extend($scope.Photo,$scope.Photo.User,$scope.Photo.Album);
      console.log( $scope.Photo1);
      var formData = new FormData;
      for(key in $scope.Photo1){
        formData.append(key, $scope.Photo1[key]);
      }
        $scope.files = [];
        for (var i = 0; i < 6; i++) {
                    $scope.files.push($('#file')[0].files[i])
                    console.log($scope.files);
            }
              for (var i in $scope.files) {
                formData.append("image", $scope.files[i]);
            }

      $http.post('/image&details', formData,{
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).then(function(res){
          $scope.item = res.data;
          refreshphotos();
      });
    };
$scope.editphotos = function(PhotosId) {
  console.log(PhotosId);
  $http.get('/getbyphotosid/' + PhotosId).then(function(response) {
    $scope.Photo = response.data;
    console.log($scope.Photo)
  });
};  

$scope.updatephoto = function() {
  console.log($scope.Photo);
  $http.post('/updatephoto/' + $scope.Photo.PhotosId, $scope.Photo).then(function(response) {
    refreshphotos();
  })
};
$scope.deletephotos = function(PhotosId) {
  $http.delete('/deletephotosdata/' + PhotosId).then(function(response) {
    refreshphotos();
  });
};
}]);  
