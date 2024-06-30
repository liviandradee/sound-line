function load_astv_script() {
    let astv_tag = document.createElement('script');
    astv_tag.id = 'astv-widget';
    astv_tag.src = 'https://cdn.assistive.com.br/plugin/AssistiveWebPlugin.js';
    astv_tag.async = true;
    astv_tag.onload = function() {
        if (typeof assistive !== 'undefined') {
            assistive.init({
                color: "F05829",
                bodyColor: "F05829",
                hPosition: 'left'
            });
        } else {
            console.error('Assistive script failed to load.');
        }
    };
    astv_tag.onerror = function() {
        console.error('Error loading Assistive script.');
    };

    document.head.appendChild(astv_tag);
}

export default load_astv_script;
