//https://ru.hexlet.io/courses/js-setup-environment/lessons/babel/theory_unit настройка бабеля и его плагинов

module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current'
      },
    }],
  ],
  plugins: ["add-module-exports"]
};