$("#login-button").click(
    function () {
        const username = $("#username").val();
        const password = $("#password").val();

        $.ajax({
            url: "https://fakestoreapi.com/auth/login",                                        //   1
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success:
                function (data) {
                    if (data.token) {
                        alert("로그인 성공!");
                        $("#category-buttons").removeClass('hidden');
                        $("#product-container").removeClass('hidden');
                        $("#login-form").addClass('hidden');
                        loadProducts(); // 로그인 성공과 동시에 category = all 전체상품 보는 형태로 불러와짐
                    } else {
                        alert("로그인 실패, 아이디 비밀번호를 확인하세요.");
                    }

                },
            error:
                    function () {
                        alert("로그인 요청에 실패했습니다. 고객센터 문의해주세요.");
            }
        })


    }
)

// Load products by category

function loadProducts(category = "all") {
    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: 'get',
        success:
            function (products) {
                const pc = $("#product-container");
                pc.empty();

                $.each(products, function (index, product) {
                    // each 문 내부에는 empty 사용 XXXXXX

                    // 필터링 조건 : all 이거나 카테고리가 일치하는 경우에만 보여주겠다.
                    if (category === "all" || product.category === category) {
                        pc.append(`
                                <div class="card">
                                    <img src="${product.image}">
                                    <div class="info">
                                        <h3>${product.title}</h3>
                                        <p>${product.description.substring(0, 100)}</p>
                                        <div class="price">${Number((product.price * 1400).toFixed(0)).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                        `)
                    }



                });

                // each 내부에 있었기 때문에 계속해서 보여진 것
                // "all" 또는 특정 카테고리에서 해당하는 상품이 없을 경우 처리
                if ($("#product-container").is(":empty")) {
                    pc.html("<p>해당 카테고리에 상품이 없습니다.</p>");
                }

            },
        error:
            function () {
                alert("상품을 불러오는데 실패했습니다.");
            }

    })
}


$("#category-buttons button").click(function () {
    const ct = $(this).data("category");
    console.log("현재 카테고리 데이터 : " + ct);
    loadProducts(ct);
})




