## Icon

![Image of Icon](images/icon.png)

### Usage

```javascript
<Icon 
  type={"FontAwesome"}
  name={"rocket"} 
/>

<Icon 
  type={"FontAwesome"}
  name={"hashtag"} 
  size={30} 
  color={"#02b875"}
/>

<Icon 
  type={"MaterialIcons"}
  name={"vpn-key"} 
  size={30} 
  color={"#ffffff"}
  style={{ 
    backgroundColor: '#E91E63', 
    padding: 10, 
    borderRadius: 30
  }}
/>
```

### Props
| prop | default | type | required | description |
| --- | :---: | :---: | :---: | --- |
| type | Ionicons | Entypo, EvilIcons, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons MaterialIcons, Octicons, SimpleLineIcons, Zocial | optional | type of the icon  |
| name | none | string | required | name of the icon |
| size | 20 | number | optional | size of the icon |
| color | black | string | optional | tint color of the icon |
| outline | none | boolean | optional | flag for using outline in type Ionicons |
| position | none | left, right | optional | position of the icon |
| style | inherited styling | object (style) | optional | style for the outer icon component |
