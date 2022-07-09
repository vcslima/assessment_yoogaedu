let GlobalFunctions = function() {};
GlobalFunctions.prototype.corAleatoria = function(){
    let o = Math.round, r = Math.random, s = 100;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
};
GlobalFunctions.prototype.isMobile = function(){
    if(window.innerWidth <= 576){
        return true;
    }else{
        return false;
    }
}
export default new GlobalFunctions();