/**
 * Created by belom88 on 04.07.2017.
 */
require.config({
    baseUrl: "/",
    paths: {
        "es6": "node_modules/requirejs-babel/es6",
        "babel": "node_modules/requirejs-babel/babel-5.8.34.min",
        "react": "node_modules/react/dist/react-with-addons.min",
        "react-dom": "node_modules/react-dom/dist/react-dom.min",
        "jquery": "node_modules/jquery/dist/jquery.min"
    },
    packages: [
        {
            name: "react_comps",
            location: "javascripts/components/",
            main: "main"
        }
    ]
});

require(['es6!javascripts/app'], function(app){});
