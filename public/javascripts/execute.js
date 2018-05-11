function ie8SafePreventEvent(e) {
    e.preventDefault() || (e.returnValue = false) || e.stopPropagation();
}

$(document).ready(function () {
    //your code here
    // $('.projects').load('projects');

    $('.projects a').click(function (e) {
        ie8SafePreventEvent(e);
        var url = $(this).attr('href');
        var path = $(this).text();
        var name = path.replace(/^.*[\\\/]/, '');

        // console.log(name);
        // $('.scripts').load(url);
        // $('.scripts').each(function(){
        //     $(this).append();
        // });

        $.getJSON(url, function (data) {

            var domain = '';
            var items = [];
            var item = "";
            var group = {all: []};
            var group_name = "";
            var group_path = "";
            var first = true;
            var namen = "";
            var namen_arr = "";
            var namen_str = "";

            $(".scripts").html("");

            // $.each(data, function (key, val) {
            //     var group_name = val.name.split('_', 2);
            //     items.push();
            // });

            $.each(data, function (key, val) {

                group_path = val.path_dir;

                if (val.name.split("_", 2)[1] === undefined) {
                    namen = val.name;
                } else {
                    namen_arr = val.name.split("_", 9).slice(1);
                    console.log(namen_arr);
                    namen = namen_arr.join("_");
                }
                namen_str = namen.split(".", 9).slice(1);
                console.log(namen);
                console.log(namen_str);

                item = "<li id='menu_" + key + "'>"
                    // + val.path_dir
                    + "<a href='" + val.url + "'>" + namen_str + "</a>"
                    + "</li>";

                console.log(item);

                // ALL
                if (val.name.split("_", 2)[1] === undefined) {

                    group_name = 'all';
                    console.log(group_name);
                    group.all.push(item);
                } else {
                    group_name = val.name.split("_", 2)[0];

                    console.log(group_name);

                    // Create group
                    if (group[group_name] === undefined) {
                        group[group_name] = [];
                    }

                    group[group_name].push(item);
                }

                // items.push();
                domain = val.domain;
            });

            // join items
            $.each(group, function (key, val) {

                if (first) {
                    $(".scripts").append("<h2>" + group_path + "</h2>");
                }
                first = false;

                var object = $("<ul/>", {
                    "class": "commands",
                    html: "<h3>" + key + "</h3>" + group[key].join("")
                }).appendTo('.scripts').find('a').click(function (e) {
                    ie8SafePreventEvent(e);
                    var url = $(this).attr('href');
                    var path = $(this).text();
                    var name = path.replace(/^.*[\\\/]/, '');

                    $('.message').load(url);

                    if (name == 'build.bat') {
                        setTimeout(function () {
                            console.log(domain);

                            var win = window.open('http://' + domain + '/', '_blank');
                            if (win) {
                                //Browser has allowed it to be opened
                                win.focus();
                            } else {
                                //Browser has blocked it
                                alert('Please allow popups for this website');
                            }
                        }, 4000);
                    }
                });

            });


        });
    });

    // $('.scripts a')

});
