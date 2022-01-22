// obtain cookieconsent plugin
var cc = initCookieConsent();

// microsoft logo
var logo = '<img alt="Logo Notre service" src="images/logo.png" style="width: 23%;margin-left: 41%;">'
var cookie = '🍪';

// run plugin with config object
cc.run({
    current_lang : 'en',
    autoclear_cookies : true,                   // default: false
    theme_css: 'cookies/src/cookieconsent.css',
    cookie_name: 'cc_cookie_demo1',             // default: 'cc_cookie'
    cookie_expiration : 365,                    // default: 182
    page_scripts: true,                         // default: false

    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // force_consent: false,
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: "/",                        // default: root
    // cookie_same_site: "Lax",
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'box',                      // box,cloud,bar
            position: 'bottom right',           // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            // position: 'left',                // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onAccept: function (cookie) {
        console.log('onAccept fired ...');

        // delete line below
        typeof doDemoThings === 'function' && doDemoThings(cookie);
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange fired ...');

        // If ads category's status was changed ...
        if (changed_preferences.indexOf('ads') > -1) {

            // If ads category is disabled ...
            if (!cc.allowedCategory('ads')) {

                // Disable gtag ...
                console.log('disabling gtag')
                window.dataLayer = window.dataLayer || [];

                function gtag() { dataLayer.push(arguments); }

                gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'ads_storage': 'denied'
                });
            }
        }

        // delete line below
        typeof doDemoThings === 'function' && doDemoThings(cookie);
    },

    languages: {
        'en': {
            consent_modal: {
                title: cookie + 'Le respect de votre vie privée est notre priorité',
                description: 'Notre site internet et les sociétés partenaires utilisent des cookies. Ces cookies nous permettent de personnaliser votre expérience utilisateur, mesurer l’audience, collecter des statistiques de visite pour l’optimisation de la publicité et l’amélioration des contenus. <br><br>Vous pouvez gérer vos préférences des cookies, accepter ou refuser le dépôt de l’ensemble des cookies. Un lien &quot;Gérer mes cookies&quot; sur notre site vous permet également de modifier vos choix à tout moment.<br><br><br> <button type="button" data-cc="c-settings" class="c-bn">Gérer mes préférences</button><br>',
                primary_btn: {
                    text: 'Tout Accepter',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Tout Refuser',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                }
            },
            settings_modal: {
                title: logo,
                save_settings_btn: 'Save settings',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Expiration'},
                    {col4: 'Description'}
                ],
                blocks: [
                    {
                        title: 'Gérer vos préférences relatives aux cookies sur le site Zénith assurance 📢',
                        description: '.'
                    }, {
                        title: 'Réalisation de statistiques de visite et d’audience',
                        description: 'Ces cookies nous permettent de réaliser des analyses statistiques de visites et d’audiences afin de mesurer l’attractivité du site et des services proposé',
                        toggle: {
                            value: 'analytics',
                            enabled: false,
                            readonly: false          // cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'Optimisation des fonctionnalités et personnalisation des services « rajouter les boutons',
                        description: 'Ces cookies nous permettent de personnaliser le contenu de notre site afin d’améliorer votre expérience et d’optimiser votre navigation.',
                        toggle: {
                            value: 'ads',     // there are no default categories => you specify them
                            enabled: false,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: '^_gcl_au',
                                col2: 'google.com',
                                col3: '2 years',
                                col4: 'description ...',
                                is_regex: true
                            },
                            {
                                col1: '_gid',
                                col2: 'google.com',
                                col3: '1 day',
                                col4: 'description ...',
                            }
                        ]
                    }, {
                        title: 'Gestion de nos actions publicitaires personnalisée rajouter les boutons ',
                        description: 'Gestion de nos actions publicitaires personnalisées « rajouter les boutons »',
                        toggle: {
                            value: 'targeting',
                            enabled: false,
                            readonly: false
                        }
                    },
                    {
                        title: 'Partage sur les réseaux sociaux « rajouter les boutons »',
                        description: 'Ces cookies déposés via les boutons réseaux sociaux ont pour finalité de permettre aux utilisateurs du site de faciliter le partage de contenu et d’améliorer la convivialité de notre Site.',
                        toggle: {
                            value: 'targeting',
                            enabled: false,
                            readonly: false
                        }
                    },{
                        title: '.',
                        description: '.',
                    }
                ]
            }
        }
    }
});
