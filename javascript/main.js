const ini_rows = 10;
let current_row = 0;
let current_clmns = 0;
let selected = null;
$(document).ready(function() {
    //flush();
    if(window.localStorage.getItem("last_table") != null){
        current_row = window.localStorage.getItem("last_rows");
        current_clmns = window.localStorage.getItem("last_cols");
        $("#table").html(window.localStorage.getItem("last_table"));

        add_cell_events();
    }else{
        first_load();
        save_data();
    }


    $("#addrow").click(add_row);
    $("#removerow").click(remove_row);
    $("#addcol").click(add_col);
    $("#removecol").click(remove_col);

    $("#table tr td").click(function(e){
        selected = e.target;
        $("#menu").css("transform", "scale(1, 1)");
    });

    $("#menu_table tr td").click(function(e) {
        $("#menu").css("transform", "scale(0, 0)");
        $(selected).css("background-image", $(e.target).css("background-image"));
        
        save_data();
    })

    $("#clearbtn").click(function(){
        $("#table tr td").css("background-image", "url('')");
        save_data();
    })

});





function add_row(){
    $("#table").append("<tr id='main_row'>" + col_string() + "</tr>");
    add_cell_events();
    current_row++;
    save_data();
}
function add_col(){
    $("#table tr").append("<td id='main_cell'></td>");
    $("#table tr td").click(function(e){
        selected = e.target;
        $("#menu").css("top", e.clientY - 100 + "px");
        $("#menu").css("left", e.clientX - 100 + "px");
        $("#menu").css("transform", "scale(1, 1)");
    });
    current_clmns++;
    save_data();
}

function remove_row(){
    $("#table tr").last().remove();
    current_row--;
    save_data();
}

function remove_col(){
    for(k = 0; k < current_row; k++){
        $($("#table tr")[k]).children().last().remove();
    }
    current_clmns--;
    save_data();
}

function col_string(){
    let string = "";
    for(i = 0; i < current_clmns; i++){
        string += "<td id='main_cell'></td>";
    }
    return string;
}

function save_data(){
    window.localStorage.setItem("last_rows", current_row);
    window.localStorage.setItem("last_cols", current_clmns);
    window.localStorage.setItem("last_table", $("#table").html());
}
function first_load(){
    current_clmns = 23;
    for(rows = 0; rows < ini_rows; rows++){
        add_row();
    }
}
function flush(){
    window.localStorage.removeItem("last_rows");
    window.localStorage.removeItem("last_cols");
    window.localStorage.removeItem("last_table");
}
function add_cell_events(){
    $("#table tr td").click(function(e){
        selected = e.target;
        $("#menu").css("top", e.clientY - 100 + "px");
        $("#menu").css("left", e.clientX - 100 + "px");
        $("#menu").css("transform", "scale(1, 1)");
    });
}