# Spark Elements

<p>
  <a href="https://www.npmjs.com/package/spark-elements"><img src="https://img.shields.io/npm/v/spark-elements.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/spark-elements"><img src="https://img.shields.io/npm/dm/spark-elements.svg?style=flat-square"></a>
</p>

Spark Elements is a react-native custom components.

## Getting Started

### Prerequisites

You will need install babel-preset-react-native-stage-0, and add to your .babelrc.

- Run the following command in a Command Prompt or shell:

```
npm install babel-preset-react-native-stage-0 --save
```

- Change your .babelrc (if you have one, if not, then create one):

```
{
  "presets": ["react-native-stage-0/decorator-support"]
}
```

### Installing

To install the Spark Elements you need to run the following command in a Command Prompt or shell:

```
npm install spark-elements --save
```

### Usage

```js
import { Button } from 'spark-elements';

<Button
  text={'Welcome to Spark Elements'}
  backgroundColor={'grey'}
  textColor={'white'}
  onClick={() => console.log("Works!")} />

```

## Components Included

- [Avatar](docs/avatar.md)
- [Background](docs/background.md)
- [Badge](docs/badge.md)
- [Button](docs/button.md)
- [CheckBox](docs/checkbox.md)
- [Divider](docs/divider.md)
- [FormChooser](docs/formchooser.md)
- [FormDatePicker](docs/formdatepicker.md)
- [FormText](docs/formtext.md)
- [Icon](docs/icon.md)
- [List](docs/list.md)
- [RatingBar](docs/ratingbar.md)
- [SearchBar](docs/searchbar.md)
- [Text](docs/text.md)
- [TextSlider](docs/textslider.md)

## Using Icon

### iOS 

If you want to use any of the bundled icons, you need to add the icon fonts to your Xcode project. Just follow these steps:

* Browse to `node_modules/spark-elements` and drag the folder `Fonts` (or just the ones you want) to your project in Xcode. **Make sure your app is checked under "Add to targets" and that "Create groups" is checked if you add the whole folder**.
* Edit `Info.plist` and add a property called **Fonts provided by application** (or `UIAppFonts` if Xcode won't autocomplete/not using Xcode) and type in the files you just added. It will look something like this:

![XCode screenshot](https://cloud.githubusercontent.com/assets/378279/12421498/2db1f93a-be88-11e5-89c8-2e563ba6251a.png)

### Android

* Copy the contents in the `Fonts` folder to `android/app/src/main/assets/fonts` (*note lowercase font folder*). 

[More info and screenshots about how to do this is available in the React Native Vector Icon documentation](https://github.com/oblador/react-native-vector-icons).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/haqiqiw/spark-elements/tags). 

## Authors

* **Fadel Trivandi Dipantara** - *Initial work* - [fadeltd](https://github.com/fadeltd)
* **M. Asrof Bayhaqqi** - *Initial work* - [haqiqiw](https://github.com/haqiqiw)

See also the list of [contributors](https://github.com/haqiqiw/spark-elements/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

The Spark Elements team would like to thank React-Native, all the contributors to the Spark Elements project and you, the Spark Elements user.
We would also thanks to developer of
* [react-native-elements](https://github.com/react-native-training/react-native-elements)
* [react-native-datepicker](https://github.com/xgfe/react-native-datepicker)
* [react-native-modal-selector](https://github.com/peacechen/react-native-modal-selector)
* [react-native-swipe-gestures](https://github.com/glepur/react-native-swipe-gestures)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [ex-navigation](https://github.com/expo/ex-navigation)