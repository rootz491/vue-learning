const app = Vue.createApp({
	// static properties/data
	data() {
		return {
			title: "Rootz World",
			artist: "Rootz",
			tickets: 1,
			image: "https://picsum.photos/200",
			imageWidth: 80,
			isGood: false,
			skills: ["React", "Vue", "Next", "Gatsby", "Node"],
			bio: {
				name: "Rootz",
				age: NaN,
				profession: "Developer",
				gender: "M",
			},
			products: [],
			cart: [],
			message: "",
			error: false,
		};
	},
	methods: {
		addToCart(product = {}) {
			if (product.stock === 0) return;
			if (product.amount > product.stock) throw new Error("Not enough stock!");
			this.cart.push({
				id: product.id,
				amount: product.amount,
			});
			this.products = this.products.map((p) => {
				if (p.id === product.id) {
					p.stock -= product.amount;
				}
				return p;
			});
		},
		emptyCart() {
			if (this.cart.length === 0) {
				alert("Your cart is empty!");
				return;
			}
			console.log("Emptying cart...");
			this.cart.map((item) => {
				const product = this.products.find((p) => p.id === item.id);
				product.stock += item.amount;
				// TODO  update the product stock in child component
			});
			this.cart = [];
		},
		checkout() {
			if (this.cart.length === 0) {
				alert("Your cart is empty!");
				return;
			}
			alert("Thank you for your purchase!");
			this.cart = [];
		},
	},
	// computed properties
	computed: {
		total() {
			return this.cart.reduce((acc, curr) => {
				const product = this.products.find((p) => p.id === curr.id);
				return acc + product.price * curr.amount;
			}, 0);
		},
	},
	// triggered when the component is mounted
	mounted() {
		console.log("App mounted");
		// fetch data from an API
		const url = "https://dummyjson.com/products";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.products);
				this.products = data.products;
			})
			.catch((err) => {
				console.log(err);
				this.error = true;
			});
	},
});
