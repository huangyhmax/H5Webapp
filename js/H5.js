/*核心组件：内容管理组件*/
var H5=function(){
    this.id = ('h5_'+Math.random()*100).replace('.','_');
    this.element=$('<div class="h5" id="'+this.id+'"></div>').hide();
    this.page=[];
    $('body').append(this.element);
    /*新增一个页面*/
    /*
    addPage()，新增一个页的方法
    @param {string}name 组件的名称，加入到ClassName中
    @param {string}text 页内的默认文本 
    @return {h5} H5对象，可以重复使用H5对象支持的方法
    */
    this.addPage = function(name,text){
        var page=$('<div class="h5_page section"></div>')
        
        if( name != undefined){
            page.addClass('h5_page_'+name);
        }
        if( text != undefined){
            page.text(text)
        }
        this.element.append(page);
        this.page.push( page )
        return this;
    }
    /*新增一个组件*/
    this.addComponent = function(name,cfg){
        // console.log(name)
        // console.log(cfg)
        var cfg = cfg || {};
        cfg = $.extend({
            type:'base'
        },cfg);
        var component;  //定义一个变量，存储组件元素
        var page = this.page.slice(-1)[0]
        switch (cfg.type) {
            case 'base':
                component = new H5Component(name,cfg); //这一步实现和其他独立组件绑定
                page.append(component); //this.page=[],this.page.push(page),到这一步，贯穿然后实现将独立组件放到页面中来。
                break;
            default:
                break;
        }
        return this;
    }
    /*初始化方法--加载图片、组件等多个资源完成后再展现*/
    this.loader = function(firstPage){
        /*在此完成fullpage*/
        this.element.fullpage({
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['1', '2', '3'],
            onLeave: function(index, nextIndex, direction){
                // debugger
                $(this).find('.h5_component').trigger('onLeave')
            },
            //滚动结束后，页面加载完成触发的回调事件
            afterLoad:function(anchorLink, index){
                // debugger
                $(this).find('.h5_component').trigger('onLoad')
            }
        });
        // this.page[0].find('.h5_component').trigger('onLoad')
        this.element.show();
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }
    }
    return this;
}