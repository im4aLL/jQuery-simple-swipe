# jQuery Simple Swipe (only 3 KB)
##### a lightweight jQuery plugin for mouse drag and mobile touch events

### Usage:
```javascript
$('.selector').simpleSwipe({
    onComplete: function(direction){
        console.log(direction); // left | right | up | down
    }
});
```

### Using bower?
```
bower install simple-swipe --save-dev
```

### Options:
```javascript
draggingClass:      'is-dragging',
dragClass:          'is-draggable',
move:               true,
moveX:              true,
moveY:              true,
onComplete:         function(direction){},
moveBack:           false
```

##### draggingClass
###### default: 'is-dragging'
When you swipe/ drag this class will add and automatically remove when event completed.

##### dragClass
###### default: 'is-draggable'
This call add when you initialize the plugin

##### move
###### default: true
true: draggable element moves with mouse move
false: draggable element doesn't move but it triggers all other events

##### moveX
###### default: true
true: moves to x axis
false: doesn't moves to x axis

##### moveY
###### default: true
true: moves to y axis
false: doesn't moves to y axis

##### moveBack
###### default: false
true: move back to position where element was
false: doesn't moves back to old position

##### onComplete
###### its an callback function
It gives you swipe event or mouse move direction

```javascript
onComplete: function(direction){
    console.log(direction);
}
```

##### Advance usage
```javascript
$('.selector').simpleSwipe({
    draggingClass: 'is-dragging',
    dragClass: 'is-draggable',
    move: true,
    moveX: true,
    moveY: true,
    onComplete: function(direction){
        console.log(direction);
    },
    moveBack: true
});
```

### For animate use following css:
```css
.is-draggable { 
    transition: transform 250ms ease-in; 
}

.is-dragging { 
    transition-property: none !important;
    cursor: move !important;
    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;      
    user-select: none;
}
```
