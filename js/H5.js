/*核心组件：内容管理组件*/
var H5=function(){
    this.id = ('h5_'+Math.random()*100).replace('.','_');
    this.element=$('<div class="h5" id="'+this.id+'"></div>').hide();
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
        return this;
    }
    /*新增一个组件*/
    /*
   
    */
    this.addComponent = function(){

    }
    /*初始化方法--加载图片、组件等多个资源完成后再展现*/
    this.loader = function(){
        /*在此完成fullpage*/
        this.element.fullpage();
        this.element.show();
    }
    return this;
}