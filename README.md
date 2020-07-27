# OpenWebProject ResponsiveReact

**Responsive layout for React**

Based upon the size of the screen (or more specifically the browser window) do conditionally rendering. Makes it possible to have different layouts for different screen/window sizes.

## Installation
`npm install owp.responsive-react --save`

## Screen sizes
I'm using the screen sizes as defined by [Bootstrap](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)

* xs - Extra small devices (portrait phones, less than 576px)
* sm - Small devices (landscape phones, 576px and up)
* md - Medium devices (tablets, 768px and up)
* lg - Large devices (desktops, 992px and up)
* xl - Extra large devices (large desktops, 1200px and up)

## Usage
Add the provider at the top of your application.
```jsx
import { ResponsiveProvider } from "owp.responsive-react";

ReactDOM.render(
    <ResponsiveProvider>
        <App />
    </ResponsiveProvider>,
    document.getElementById("root")
);
```

Conditional render based upon screen/window size.
```jsx
import Responsive, { XS, SM, MD, LG, XL } from "owp.responsive-react";

//Render div if screen/window size is md(Medium) or larger.
<Responsive min="md">
    <div>min md</div>
</Responsive>

//Render div if screen/window size is md(Medium) or smaller.
<Responsive max="md">
    <div>max md</div>
</Responsive>

//Render div if screen/window width is 500px or more.
<Responsive minWidth={500}>
    <div>minWidth 500</div>
</Responsive>

//Render div if screen/window width is 500px or less.
<Responsive maxWidth={500}>
    <div>maxWidth 500</div>
</Responsive>

//Render div if screen/window height is 300px or more.
<Responsive minHeight={300}>
    <div>minHeight 300</div>
</Responsive>

//Render div if screen/window height is 300px or less.
<Responsive maxHeight={300}>
    <div>maxHeight 300</div>
</Responsive>

//Render div if screen/window is in portrait mode(height >= width).
<Responsive isPortrait={true}>
    <div>isPortrait</div>
</Responsive>

//Render div if screen/window is in landscape mode(height < width).
<Responsive isLandscape={true}>
    <div>isLandscape</div>
</Responsive>

//Render best matching layout based upon screen/window size.
<Responsive>
    <XS><div>Extra small</div></XS>
    <SM><div>Small</div></SM>
    <MD><div>Medium</div></MD>
    <LG><div>Large</div></LG>
    <XL><div>Extra large</div></XL>
</Responsive>

//Can be combined with a condition. Will render the best match, but only in portrait mode.
<Responsive isPortrait={true}>
    <XS><div>Extra small</div></XS>
    <SM><div>Small</div></SM>
    <MD><div>Medium</div></MD>
    <LG><div>Large</div></LG>
    <XL><div>Extra large</div></XL>
</Responsive>
```