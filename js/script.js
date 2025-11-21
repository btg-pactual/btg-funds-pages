$(document).ready(function() {
    // Marca linha ativa
    $("li.list-group-item").on("click", function() {
        $(this).toggleClass("ativo").siblings().removeClass("ativo");
    });

    //Scroll ate o conteúdo versão mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    $("li.list-group-item a").on("click", function() {
        if (isMobile()) {
            setTimeout(function() {
            $('html, body').animate({
            scrollTop: $("iframe[name='conteudo']").offset().top - 20
            }, 400);
            }, 300);
        }
    });


    // Filtro de busca atualizado
    $("#busca").on("keyup", function() {
    var valor = $(this).val().toLowerCase();
    var encontrados = 0;


    $("li.list-group-item").each(function() {
    var match = $(this).text().toLowerCase().indexOf(valor) > -1;
    $(this).toggle(match);
    if (match) encontrados++;
    });

    // Filtro de busca
    $("#busca").on("keyup", function() {
        var valor = $(this).val().toLowerCase();
        $("li.list-group-item").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });

    //Retorno Busca
    if (encontrados === 0) {
        $("#nenhumResultado").show();
        } else {
        $("#nenhumResultado").hide();
        }
    });

    //Alerta para saída da página com target:_blank
    let pendingURL = null;

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        pendingURL = this.href;

        document.getElementById("externalModal").style.display = "block";
    });
    });

    document.getElementById("cancelExit").addEventListener("click", () => {
    pendingURL = null;
    document.getElementById("externalModal").style.display = "none";
    });

    document.getElementById("confirmExit").addEventListener("click", () => {
    if (pendingURL) {
        window.open(pendingURL, "_blank");
    }
    document.getElementById("externalModal").style.display = "none";
    });

    
});