
$(function () {


  //表单验证
  $('form').bootstrapValidator({

    //指定校验图标显示，默认为bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields: {

      //验证账号
      username: {
        validators: {
          //用户名为空时提示
          notEmpty: {
            message: '用户名不能为空'
          },

          //验证字符长度
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6位之间'
          },
          callback: {
            message: '用户名或密码错误'
          }
        }
      },

      //验证密码
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          //验证密码长度
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12位之间'
          },

          //回调函数
          callback: {
            message: '用户名或密码错误'
          }
        }
      }
    }


  })

  //ajax提交
  $('form').on('success.form.bv', function (e) {

    e.preventDefault();

    //使用ajax提交表单
    $.ajax({
      //提交地址
      url: '/employee/employeeLogin',
      //提交方式
      type: 'post',
      //表单序列化提交
      data: $('form').serialize(),
      success: function (info) {
        console.log(info);
        //成功
        if(info.success){
          // alert('成功跳转')
          location.href = 'index.html';
        }

        //1000
        if(info.error === 1001){
          $('form').data('bootstrapValidator').
          updateStatus('username', 'INVALID', 'callback');
        }

        if(info.error === 1000){
          $('form').data('bootstrapValidator').
          updateStatus('username', 'INVALID', 'callback');
        }

      }
    })

  })


  //重置
  $('[type=reset]').on('click',function(){
     
      $('form')
      .data('bootstrapValidator')
      .resetForm(true);

  })




})