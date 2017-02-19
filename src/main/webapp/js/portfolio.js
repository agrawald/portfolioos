$(function(){
    var Portfolio = Backbone.Model.extend({
        urlRoot: '/api/portfolio/file',
        idAttribute: 'id',
        url: function(){
            return this.urlRoot;
        }
    });

    var ContactMe = Backbone.Model.extend({
        urlRoot: '/api/contact/dagrawal',
        idAttribute: 'id',
        url: function(){
            return this.urlRoot;
        }
    });

    var PortfolioCollection = Backbone.Collection.extend({
        userId: 'dagrawal',
        model: Portfolio,
        url:function(){
            return '/api/portfolio/file/' + this.userId;
        }
    });

    //--------------------------------------------------------------------------
    //Views
    //--------------------------------------------------------------------------

    var GenericView = Backbone.View.extend({
        collections: new PortfolioCollection(),
        model: null,
        emailRegEx: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
        el_templates: {'#tNavigation': '#navigation',
            '#tHeader':'#header',
            '#tPortfolio': '#portfolio',
            '#tPortFolioModels': '#portFolioModels',
            '#tAbout': '#about',
            '#tFooter': '#footer',
            '#tContact': '#contact'},
        initialize: function(){
            if(_.isNull(this.model) || _.isUndefined(this.model))
            {
                var _this = this;
                this.collections.fetch({
                    success: function(collection){
                        _this.onSuccessHandler(collection);
                    }
                });
            }
        },
        onSuccessHandler: function(collection){
            var _this = this;
            _.each(collection.models, function(model){
                if(model.attributes.enabled)
                {
                    _this.model = model;
                    _this.render();
                }
            })
        },
        render: function(){
            var _this = this;
            _.map(this.el_templates, function(el, key){
                var hb_template = Handlebars.compile($(key).html());
                var html = hb_template(_this.model.toJSON());
                $(el).html(html);
            });

            this.events();

            return this;
        },
        submit: function (event) {
            event.preventDefault();
            var contact = new ContactMe();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            contact.save({
                    name: name,
                    email: email,
                    contact: phone,
                    message: message,
                    userId: $('#userId').val()
                },
                {
                    error: function(model, response){
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                    success:function(model, response){
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                }
            );
        },
        events: function(){
            var _this = this;
            $('.page-scroll a').bind('click',function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top}
                    , 1500
                    , 'easeInOutExpo');
                event.preventDefault();
            });

            $("body").on("input propertychange", ".floating-label-form-group", function(e) {
                $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
            }).on("focus", ".floating-label-form-group", function() {
                $(this).addClass("floating-label-form-group-with-focus");
            }).on("blur", ".floating-label-form-group", function() {
                $(this).removeClass("floating-label-form-group-with-focus");
            });

            // Highlight the top nav as scrolling occurs
            $('body').scrollspy({
                target: '.navbar-fixed-top'
            });


            $("input,textarea").jqBootstrapValidation({
                preventSubmit: true,
                submitError: function($form, event, errors) {
                    // additional error messages or events
                },
                submitSuccess: function($form, event) {
                    event.preventDefault(); // prevent default submit behaviour
                    _this.submit(event);
                }
            });

            $("a[data-toggle=\"tab\"]").click(function(e) {
                e.preventDefault();
                $(this).tab("show");
            });


            $('#name').focus(function() {
                $('#success').html('');
            });
        }
    });


    //--------------------------------------------------------------------------
    //Router
    //--------------------------------------------------------------------------
    var PortfolioRouter = Backbone.Router.extend({
        routes:{
            '': 'header'
        },
        initialize: function(){
            new GenericView();
        }
    });

    new PortfolioRouter();
    Backbone.history.start();
});
