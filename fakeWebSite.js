

$("#login-button").click(
    function () {
            const username = $("#username").val();
            const password = $("#password").val();

            $.ajax({
                url: "auth/login",                                        //   1
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    username:username,
                    password:password
                }),
                success:
                        function (data){
                                alert("로그인 성공!");
                                // 로그인성공 시 hidden class 삭제         //   2
                                // category-buttons, product=container

                            // 로그인 성공할 경우 hidden class 추가          // 3
                            // login-form
                        }
            })


    }
)