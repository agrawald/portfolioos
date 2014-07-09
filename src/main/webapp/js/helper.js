/**
 * Created by e7006722 on 4/03/14.
 */
Handlebars.registerHelper('about', function(items, options) {
    /*<div class="col-lg-4 col-lg-offset-2">
     <p>{{escape this}}</p>
     </div>
     <div class="col-lg-4">
     <p>{{escape this}}</p>
     </div>*/

    var evenDiv = "<div class='col-lg-4 col-lg-offset-2'>";
    var oddDiv = "<div class='col-lg-4'>";
    for(var i=0, l=items.length; i<l; i++) {
        if(i%2==0)
            evenDiv = evenDiv + "<p>" + items[i] + "</p>";
        else
            oddDiv = oddDiv + "<p>" + items[i] + "</p>";
    }

    evenDiv = evenDiv + "</div>";
    oddDiv = oddDiv + "</div>";
    return evenDiv + oddDiv;
});

Handlebars.registerHelper('idOf', function(name) {
    return name.replace(/[^a-zA-Z0-9]/g, "_");
});

Handlebars.registerHelper('escape', function(text) {
    return Handlebars.Utils.escapeExpression(text);
});

Handlebars.registerHelper('fullName', function(user, options) {
    return options.fn(user).toUpperCase();
});

Handlebars.registerHelper('address', function(address) {
    return address.unit + "/"
        + address.plot + ", "
        + address.road + " " + address.type
        + "<br>"+ address.suburb + ", "
        + address.state + " "
        + address.zipcode;
});


Handlebars.registerHelper('tech', function(items, options) {
    /*<ul class="list-inline item-details">
     <li>Client: <strong><a href="#">{{client}}</a></strong>
     </li>
     <li>Service: <strong><a href="#">{{designation}}</a></strong>
     </li>
     </ul>*/
    var out = "<ul class='list-inline item-details'>";

    for(var i=0, l=items.length; i<l; i++) {
        if(options.fn(items[i]) == "")
            out = out + "<li><strong><a href='#'>" + items[i] + "</a></strong></li>";
        else
            out = out + "<li><strong><a href='#'>" + options.fn(items[i]) + "</a></strong></li>";
    }

    return out + "</ul>";
});


Handlebars.registerHelper('list', function(items, options) {
    var out = "<ul class='list-inline item-details'>";

    for(var i=0, l=items.length; i<l; i++) {
        if(options.fn(items[i]) == "")
            out = out + "<li>" + items[i] + "</li>";
        else
            out = out + "<li>" + options.fn(items[i]) + "</li>";
    }

    return out + "</ul>";
});

//Handlebars.registerHelper('technology', function (items, options) {
//    var out = "<ol>";
//
//    for (var i = 0, l = items.length; i < l; i++) {
//        if(options.fn(items[i]) == "")
//            out = out + "<li class='show-bean'>" + items[i] + "</li>";
//        else
//            out = out + "<li class='show-bean'>" + options.fn(items[i]) + "</li>";
//    }
//
//    return out+"</ol>";
//});

//Handlebars.registerHelper('contact', function(contact, options){
//    return options.fn(contact);
//});
