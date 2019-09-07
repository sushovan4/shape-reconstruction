# <img src="http://www.smajhi.com/shape-reconstruction/img/icon.png" width="50px"> Shape Reconstruction


The purpose of this software is to demonstrate a topological method for Euclidean shape reconstrcution, which was developed and analyzed in the following paper: https://arxiv.org/abs/1810.10144. 

![website](http://www.smajhi.com/shape-reconstruction/img/whole.png)


## Table of Contents
- [Basic Definitions](#basic-definitions)
    - Vietoris-Rips Complex
    - Hausdorff Distance
    - Shadow Complex
- [Installation](#installaion)
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
Given a metric space <img src="https://latex.codecogs.com/gif.latex?(S,d)" />, the Vietoris-Rips complex renders its geometry at a positive scale <img src="https://latex.codecogs.com/gif.latex?\epsilon" title="\epsilon" />. The Vietoris-Rips complex on 

## Installation
The web application does not require any extra installation besides a web-browser with an Internet connection. Hit the url https://www.smajhi.com/shape-reconstruction from your favorite browser to open it. The app runs client-side Javascritpt for all the computations, so you may need to enable JS engine in your browser. The supported browsers include Google Chrome (>=48.0), Firefox (>=65.0), Opera, and Safari. All the above mentioned browsers run JS by default. The supported devices include Desktop, Laptop, Tablet, and Phones. Since computing rips complexes involve quadratic time operations, the app uses a ton of system CPU and RAM when the a large sample size is chosen. For this reason, **we strongly discourage the users to run the application on their phones or similar devices with very limited computational resources**.

## Usage

#### Select Shape
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

