(function(css, name, autoinject) {
    var link = document.createElement('style');
    link.innerHTML = css;
    link.id = name;
    if (autoinject === true) {
        document.head.appendChild(link);
    }
    module = module || {};
    module.exports = link;
})("<<<<CSS>>>>", "<<<<NAME>>>>", <<<<AUTOINJECT>>>>);
