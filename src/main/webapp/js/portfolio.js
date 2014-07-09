$(function(){
    var Portfolio = Backbone.Model.extend({
        urlRoot: '/api/portfolio',
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
            return '/api/portfolio/' + this.userId;
        },
        getEnabled:function(){
            return this.where({enabled: true});
        }
    });

    //--------------------------------------------------------------------------
    //Views
    //--------------------------------------------------------------------------

    var GenericView = Backbone.View.extend({
        collections: new PortfolioCollection(),
        initialize: function(){
            var _this = this;
            this.collections.fetch({
                success: function(collection){
                    _this.onSuccessHandler(collection);
                }
            });
        },
        onSuccessHandler: function(collection){
            var _this = this;
            _.each(collection.models, function(model){
                if(model.attributes.enabled)
                    _this.render(model)
            })
        },
        render: function(model){
            if(!_.isUndefined(model) && !_.isUndefined(this.template))
            {
                var hb_template = Handlebars.compile(this.template);
                var html = hb_template(model.toJSON());
                this.$el.html(html);
            }

            return this;
        }
    });

    var NavigationView = GenericView.extend({
        el: '#navigation',
        template: $('#tNavigation').html()
    });

    var HeaderView = GenericView.extend({
        el: '#header',
        template: $('#tHeader').html()
    });

    var PortfolioView = GenericView.extend({
        el:'#portfolio',
        template: $('#tPortfolio').html()
    });

    var PortFolioModelsView = GenericView.extend({
        el:'#portFolioModels',
        template: $('#tPortFolioModels').html()
    });

    var AboutView = GenericView.extend({
        el: '#about',
        template: $('#tAbout').html()
    });

    var TechnologiesView = GenericView.extend({
        el: '#technologies',
        template: $('#tTechnologies').html()
    });

    var TestimonialsView = GenericView.extend({
        el: '#testimonials',
        template: $('#tTestimonials').html()
    });

    var FooterView = GenericView.extend({
        el: '#footer',
        template: $('#tFooter').html()
    });


    var ContactMeView = GenericView.extend({
        el: '#contact',
        template: $('#tContact').html(),
        emailRegEx: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
        validate: function()
        {
            if(_.isEmpty($('#name').val()))
            {
                $('#name').focus();
                new DialogView().render({
                    code: "REQUIRED",
                    message: "Full Name is required"
                });
                return false;
            }
            else if(_.isEmpty($('#email').val()))
            {
                $('#email').focus();
                new DialogView().render({
                    code: "REQUIRED",
                    message: "Email is required"
                });
                return false;
            }
            else if(!_.isEmpty($('#email').val()) && !(this.emailRegEx.test($('#email').val())))
            {
                $('#email').focus();
                new DialogView().render({
                    code: "INVALID",
                    message: "Email is invalid"
                });
                return false;
            }

            return true;
        },
        submit: function (event) {
            console.log(event);
            event.preventDefault();
            var contact = new ContactMe();
            if(this.validate())
            {
                contact.save({
                    name: $('#name').val(),
                    email: $('#email').val(),
                    contact: $('#contact').val(),
                    message: $('#message').val(),
                    userId: $('#userId').val()
                },
                {
                    error: function(model, response){
                        return new DialogView().render(response);
                    },
                    success:function(model, response){
                        return new DialogView().render(response);
                    }
                });
            }
        }
    });

    var DialogView = Backbone.View.extend({
        el:'#dialog',
        template: $('#tDialog').html(),
        render: function(model){
            if(!_.isUndefined(model))
            {
                console.log("In render" + model);
                var hb_template = Handlebars.compile(this.template);
                var html = hb_template(model);
                this.$el.html(html);
                $('#dialog').dialog();
            }
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
            new NavigationView().render();
            new HeaderView().render();
            new AboutView().render();
            new PortfolioView().render();
            new PortFolioModelsView().render();
            new TechnologiesView().render();
            new TestimonialsView().render();
            new ContactMeView().render();
            new FooterView().render();
        }
    });

    new PortfolioRouter();
    Backbone.history.start();
});
