## Background

### Usage
- [Background with header.](#background-with-header-)
- [Background with footer.](#background-with-footer-)

#### Background with header.

<img src="images/background1.png" alt="Image of Background1" width="250" height="400" />

```javascript
<Background
  backgroundColor={'#F1F8E9'}
  style={{ flex: 1 }}
  header={require('./../assets/images/header.png')}>
</Background>
```

#### Background with footer.

<img src="images/background2.png" alt="Image of Background2" width="250" height="400" />

```javascript
<Background
  backgroundColor={'#F1F8E9'}
  style={{ flex: 1 }}
  footer={require('./../assets/images/footer.png')}>
</Background>
```

### Props
| prop | default | type | required | description |
| --- | :---: | :---: | :---: | --- |
| style | inherited styling | object (style) | optional | styling for outer container |
| children | none | any | optional | content above background  |
| header | none | object (image) | optional | source image for header |
| footer | none | object (image) | optional | source image for footer |