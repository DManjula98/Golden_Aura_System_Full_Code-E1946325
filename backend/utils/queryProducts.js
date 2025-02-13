class queryProducts{

    products =[]
    query ={}
    constructor(products,query){
        this.products= products
        this.query = query
    }
    
    categoryQuery = () => {
        if (this.query.category) {
            this.products = this.products.filter(product => product.category === this.query.category);
        }
    
        if (this.query.subcategory) {
            this.products = this.products.filter(product => product.subcategory.trim().toLowerCase() === this.query.subcategory.trim().toLowerCase());

        }

        if (this.query.brand) {
            this.products = this.products.filter(product => product.brand === this.query.brand);

        }
        
        return this;
    };
    
    priceQuery = () => {
        this.products = this.products.filter(p => p.price >= this.query.lowPrice && p.price <= this.query.highPrice)
        return this
    }

    searchQuery = () => {
        if (this.query.searchValue) {
            const searchValueUpper = this.query.searchValue.toUpperCase();
            this.products = this.products.filter(product => 
                product.name.toUpperCase().includes(searchValueUpper)
            );
        }
        return this
    }
    
    
    sortByPrice = () => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === 'low-to-high') {
                this.products = this.products.sort(function (a, b) { return a.price - b.price })
            } else {
                this.products = this.products.sort(function (a, b) { return b.price - a.price })
            }
        }
        return this
    }

    ratingQuery() {
        if (this.query.rating) {
          const minRating = parseInt(this.query.rating);
          this.products = this.products.filter(
            (product) =>
              product.rating >= minRating && product.rating < minRating + 1
          );
        }
        return this;
      }
    skip = () => {
        let { pageNumber } = this.query;
        const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage;
        this.products = this.products.slice(skipPage);
        return this;
    }
    
    limit = () => {
        let temp = []
        if (this.products.length > this.query.parPage) {
            for (let i = 0; i < this.query.parPage; i++) {
                temp.push(this.products[i])
            }
        } else {
            temp = this.products
        }
        this.products = temp

        return this
    }

    getProducts =() =>{
        return this.products
    }

    countProducts = () => {
        return this.products.length
    }

}

module.exports = queryProducts