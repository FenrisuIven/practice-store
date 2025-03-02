const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    buttonCaption: 'Add Product'
  });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description, category } = req.body;
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description,
    category,
    rating: 0
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  res.redirect('/');
}

exports.getEditProduct = (req, res) => {
  req.user.getProducts({ where: { id: req.params.productId } })
    .then(products => {
      const product = products[0];
      if (!product) throw Error('entry not found');
      console.log(product.dataValues)
      res.render('admin/edit-product.pug', {
        pageTitle: 'Edit',
        buttonCaption: 'Save Changes',
        productId: req.params.productId,
        product: product.dataValues
      });
    }).catch(err => {
      console.log(err);
    });
}

exports.postEditProduct = (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.productId
    }
  }).catch(err => {
    console.log(err);
  });
  res.redirect('/')
}

exports.getAdminProducts = (req, res) => {
  req.user.getProducts()
    .then(products => {
      const productsToDisplay = Product.getProductsToDisplay(products);
      res.render('admin/products-list.pug', {
        pageTitle: `${req.user.username}'s created products`,
        prods: productsToDisplay,
        starSettings: {
          fillAmounts: Array.from({ length: 5 }).fill('100%')
        }
      })
    })
}