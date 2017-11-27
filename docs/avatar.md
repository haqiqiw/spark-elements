## Avatar

### Usage
- [Avatar.](#avatar-)
- [Avatar with initials.](#avatar-with-initials-)
- [Avatar with icons.](#avatar-with-icons-)
- [Avatar with edit button.](#avatar-with-edit-button-)

#### Avatar.

![Image of Avatar1](images/avatar1.png)

```javascript
<Avatar
  small
  rounded
  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  medium
  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/128.jpg"}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  large
  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  xlarge
  rounded
  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/whale/128.jpg"}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
```

#### Avatar with initials.

![Image of Avatar2](images/avatar2.png)

```javascript
<Avatar
  small
  rounded
  title="ER"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  medium
  title="YN"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  large
  title="AD"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  xlarge
  rounded
  title="HQ"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
```

#### Avatar with icons.

![Image of Avatar3](images/avatar3.png)

```javascript
<Avatar
  small
  rounded
  icon={{ type : 'FontAwesome', name : 'user' }}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  medium
  icon={{ type : 'MaterialIcons', name : 'cloud' }}
  overlayContainerStyle={{backgroundColor: 'steelblue'}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  large
  icon={{ type: 'Entypo', name: 'rocket', color: 'orange', size: 40 }}
  overlayContainerStyle={{backgroundColor: 'white'}}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<Avatar
  xlarge
  rounded
  icon={{ type : 'MaterialIcons', name : 'home' }}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
```

#### Avatar with edit button.

![Image of Avatar4](images/avatar4.png)

```javascript
<Avatar
  xlarge
  rounded
  source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/whale/128.jpg"}}
  activeOpacity={0.7}
  showEditButton={true}
  editButton={{ iconName: 'add-a-photo', iconType: 'MaterialIcons', iconColor: 'white' }}
  onEditPress={() => console.log("Edit!")}
/>
```

### Props
| prop | default | type | required | description |
| --- | :---: | :---: | :---: | --- |
| component | TouchableOpacity | View, if onPress then TouchableOpacity or TouchableHighlight | optional | component for enclosing element (eg: TouchableHighlight, View, etc) |
| onPress | none | func | optional | callback function when pressing component |
| onLongPress | none | func | optional | callback function when long pressing component |
| containerStyle | inherited styling | object (style) | optional | styling for outer container |
| icon | none | object {size, name, type, color } | optional | source icon avatar |
| iconStyle | none | object (style) | optional | extra styling for icon component |
| source | none |	object (image) | optional | image source |
| small | none | boolean | optional | set size avatar to 34 x 34 |
| medium | none |boolean | optional | set size avatar to 50 x 50 |
| large | none | boolean | optional | set size avatar to 75 x 75 |
| xlarge | none | boolean | optional | set size avatar to 150 x 150 |
| avatarStyle | inherited styling | object (style) | optional | styling for avatar |
| rounded | none | boolean | optional | determines the shape of avatar |
| title | none | string | optional | renders title in the avatar |
| titleStyle | none | object (style) | optional | style for the title |
| overlayContainerStyle | none | object (style) | optional | style for the view outside image or icon |
| activeOpacity | none | number | optional | opacity when pressed |
| showEditButton | false | boolean | optional | determines show the edit button |
| editButton | { size: null, iconName: 'mode-edit', iconType: 'MaterialIcons', iconColor: 'white',underlayColor: DEFAULT_COLORS[0], style: null } | object {size, iconName, iconType, iconColor, underlayColor, style } | optional | source icon edit button |
| onEditPress | none | func | optional | onPress method for edit button |