// создаем объект
var app = app || {};

$(function () {

    //создаем прототип нашего объекта или модели
    app.MyObject = Backbone.Model.extend({
        //атрибуты по умолчанию
        defaults: {
            name: "name",
            description: "-",
            size: 100
        },

        //инициализируем объект после создания
        initialize: function() {
            console.log('obj created');

            //слушаем изминения объекта
            this.on('change',function(){
                console.log('obj changed');
                //получаем только измененную часть объекта
                var json = this.changedAttributes();
                console.log(json);
            });
        },

        //валидатор
        validate: function(attrs) {
            if (attrs.size>1000) {
                console.log('Incorrect size');
                return 'Incorrect size';
            }
            //если ошибок нет, то ничего не возвращаем
        },

        //добавляем функцию, увеличивающую size
        increaseSize: function() {
            this.set({
                size: this.get('size')+100
            },{
                validate:true //проверяем на валидность
            });
        }
    });

    //создаем объект
    app.myObject = new app.MyObject({
        name: "rocket",
        description: "super"
    });

    //записываем новые атрибуты
    app.myObject.set({
        size: 250,
        type: 'active'
    });

    //увеличиваем size объекта по нажатию на кнопку
    $('#myButton').live('click',function(){
        app.myObject.increaseSize();
    });

});
