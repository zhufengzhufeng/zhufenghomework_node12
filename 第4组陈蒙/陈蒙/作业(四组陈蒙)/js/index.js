/**
 * Created by chenmeng on 2017/1/9.
 */

var app = angular.module('appModule', ['ui.bootstrap']);

app.controller('tableCtrl', function ($scope, $http) {
    $scope.condition = 'name';
    $scope.total = null;
    // 载入加载
    // $scope.load = function () {
    //     $http({
    //         method: 'get',
    //         url: '/getAllList?n=1',
    //         dataType: 'json'
    //     }).then(function (data) {
    //         $scope.total = data.data.total;
    //         $scope.datas = data.data.data;
    //     })
    // }
    // $scope.load()

});
/**
 *
 */
// demo controller
app.controller('modalDemo', function ($scope, $modal, $log, $http) {
    // list

    $scope.load = function () {
        $http({
            method: 'get',
            url: '/getAllList?n=1',
            dataType: 'json'
        }).then(function (data) {
            $scope.total = data.data.total;
            $scope.datas = data.data.data;
        })
    }
    $scope.load()
    $scope.removeId = function (id) {
        $http({
            method: 'get',
            url: '/removeInfo?id='+id,
            data:JSON.stringify($scope.res),
            dataType: 'json'
        }).then(function (data) {
            if(data && data.data.code == 0){
                console.log('提交成功')
            }
        })
        $scope.datas = $scope.datas.filter(function (item) {
            return item.id != id;
        })
    }

    // open click
    $scope.open = function (cid) {
        var modalInstance = $modal.open({
            templateUrl: 'modal_window',
            controller: 'ModalInstanceCtrl', // specify controller for modal
            resolve: {
                data: function () {
                    return {
                        cid:cid,
                        datas: $scope.datas,
                    }
                }
            }
        });
        // modal return result
        modalInstance.result.then(function ($scope) {
            // 点击确定执行的函数

        }, function () {
            // 点击取消

            //$log.info()
        });
       /* modalInstance.opened.then(function () {//模态窗口打开之后执行的函数
            console.log($scope.cid);
        });*/
    }
})
app.controller('modalDemo2', function ($scope, $modal, $log, $http) {


    // open click
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modal_window2',
            controller: 'ModalInstanceCtrl2', // specify controller for modal
        });
        // modal return result
        modalInstance.result.then(function ($scope) {
            // 点击确定执行的函数

        }, function () {
            // 点击取消

            //$log.info()
        });
        /* modalInstance.opened.then(function () {//模态窗口打开之后执行的函数
         console.log($scope.cid);
         });*/
    }
})
// modal controller
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, data,$http) {
    $scope.data = data;
    $scope.cid = data.cid;
    console.log($scope.data.datas)
    $scope.res = $scope.data.datas.find(function (item) {
        return item.id == $scope.cid;
    })
    $scope.res.sex = $scope.res.sex == 0 ? '男':'女';
    // ok click
    $scope.ok = function () {
        $scope.res.id  = $scope.cid
        $http({
            method: 'post',
            url: '/updateInfo',
            data:JSON.stringify($scope.res),
            dataType: 'json'
        }).then(function (data) {
            console.log(data)
            if(data && data.data.code == 0){
                console.log('提交成功')
                $http({
                    method: 'get',
                    url: '/getAllList?n=1',
                    dataType: 'json'
                }).then(function (data) {
                    $scope.datas = data.data.data;
                })
            }
        })
        $modalInstance.close();
    };
    // cancel click
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }
});
app.controller('ModalInstanceCtrl2', function ($scope, $modalInstance,$http) {
    $scope.res = {};
    // ok click
    $scope.ok = function () {
        $http({
            method: 'post',
            url: '/addInfo',
            data:JSON.stringify($scope.res),
            dataType: 'json'
        }).then(function (data) {
            if(data && data.data.code == 0){
                console.log('提交成功')
                location.reload()
            }
        })
        $modalInstance.close();
    };
    // cancel click
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }
});