// Add notes
$("#noteForm").submit((e) => {
    e.preventDefault();
    let notes = $("textarea[name=inputNote]").val();

    if (notes === "") {
        alert("Pls input your notes");
        return;
    } else {
        $.ajax({
            url: "/api/notes",
            type: "POST",
            data: {inputNote: notes},
            success: function (res) {
                console.log(res);
            }
        }).done(() => {
            window.location.reload();
        })
    }
});

// Edit notes
$(".updateForm").on("blur", (e) => {
    let index = e.target["name"];
    let notes = $(`textarea[name=${index}]`).val();
  
    $.ajax({
        url: `/api/notes/${index}`,
        type: "PUT",
        data: {inputNote: notes},
        success: function (res) {
            console.log(res);
        }
    }).done(() => {
        window.location.reload();
    })
});

// Delete notes
$(".btn-delete").on("click", (e) => {
    let index = e.target.id;
  
    $.ajax({
        url: `/api/notes/${index}`,
        type: "DELETE",
        success: function (res) {
            console.log(res);
        }
    }).done(() => {
        window.location.reload();
    })
});
