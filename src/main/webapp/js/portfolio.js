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

            $('#submit').button().click(function (event) {
                return _this.submit(event);
            });
            return this;
        },
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
                            //return new DialogView().render(response);
                        },
                        success:function(model, response){
                            //return new DialogView().render(response);
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
            new GenericView();
        }
    });

    new PortfolioRouter();
    Backbone.history.start();
});
