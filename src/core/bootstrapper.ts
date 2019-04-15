import platform from './platform';
import loader from './loader';
import discoverBaseApp from './discover-base-app';

export default () => {
  discoverBaseApp
    .then(app_element => {
      let app_url: string = app_element.getAttribute('app') || 'app';
      loader(app_url)
        .then(_mod_init_app => {
          platform
            .bootstrap(_mod_init_app, {templateExtension:''})
            .at(app_element);
        });
    });
};