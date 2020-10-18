$(document).ready(function(){
    $(".gen-pass-form").submit(function(event){
        event.preventDefault();
        var digit = $("#digit").val();
        if(digit != 0){
            var pattern = "n@lfl$s^ufAfnlafegkn7nlbai%jqpe&p!u5+1hm|LNdfnlF{NI5}git5HWPNV5hfaon&kv*op?eqthb34kjgf1ur";
            var index = 0;
            var password = "";
            for(var i = 0;i<=digit;i++){
                index = Math.floor(Math.random()*(pattern.length-1));
                password += pattern[index];
            }
            $("#password").val(password);
        }
        else{
            $(".notice").removeClass("d-none");
            $(".notice").html("<b>please enter any digit to get password</b>");
            setTimeout(function(){
                $(".notice").html("");
                $(".notice").addClass("d-none");
            },3000);
        }
    });
    
});