# <img src="http://www.smajhi.com/shape-reconstruction/img/icon.png" width="50px"> Shape Reconstruction


The purpose of this software is to demonstrate a topological method for Euclidean shape reconstrcution, which was developed and analyzed in the following paper: https://arxiv.org/abs/1810.10144. 


## Table of Contents
- [Basic Definitions](#basic-definitions)
    - Vietoris-Rips Complex
    - Hausdorff Distance
    - Shadow Complex
- [Installation](#installation)
- [Usage](#usage)
    - Select Shape
    - Select Sample
    - Build Euclidean Rips
    - Build Shadow
    - Settings
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Basic Definitions

#### Vietoris-Rips Complex

#### Hausdorff Distance

#### Shadow Complex



## Installation
The web application does not require any extra installation besides a web-browser with an Internet connection. Hit the url https://www.smajhi.com/shape-reconstruction from your favorite browser to open it. The app runs client-side Javascritpt for all the computations, so you may need to enable JS engine in your browser. The supported browsers include Google Chrome (>=48.0), Firefox (>=65.0), Opera, and Safari. All the above mentioned browsers run JS by default. The supported devices include Desktop, Laptop, Tablet, and Phones. Since computation of Rips complexes involves quadratic time operations, the app uses a ton of system CPU and RAM when the a large sample size is chosen. For this reason, **we strongly discourage the users to run the application on their phones or similar devices with very limited computational resources**.



## Usage
Altough the webapp is build keeping Euclidean (2D) shape reconstruction in mind, it can also be used to demontrate random sampling of a shape, Vietoris-Rips complexes, and vusualization of Hausdorff distance. We discuss below the features (so far)
in detail.

The homepage consists of a navigation menu on top, below it are a white canvas on the left and selection tools on the right side. 

![website](http://www.smajhi.com/shape-reconstruction/img/whole.png)

The canvas is the place where all visualizations take place. The selection tools to its right is the main user input section, where four of its subsections are stacked vertically. Each subsection is discussed below.

#### Select Shape
This input tool lets the user select a shape from dropdown menu shown below:
Except for the first option, choosing other shapes immediately draws the selected shape on the canvas.

![website](http://www.smajhi.com/shape-reconstruction/img/shape_select.png)

#### Select Sample
![website](http://www.smajhi.com/shape-reconstruction/img/sample_select.png)

#### Build Euclidean Vietoris-Rips Complex
![website](http://www.smajhi.com/shape-reconstruction/img/build_rips.png)

#### Build Shadow Complex
![website](http://www.smajhi.com/shape-reconstruction/img/build_shadow.png)


#### Settings
![website](http://www.smajhi.com/shape-reconstruction/img/sidebar.png)


## Contributing


## Credits

## License
This project is licensed under the MIT License; read [LICENSE](https://www.smajhi.com/shape-reconstruction/LICENSE).

