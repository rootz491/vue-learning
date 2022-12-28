<template>
	<div id="nav">
		<h3>Learning Vue</h3>
		<div>
			<p>Items {{ cart.length }}</p>
			<button @click="emptyCart">Clear Cart</button>
			<button @click="checkout">Checkout</button>
			<!-- conditional toggle of classes based on truthy statements! -->
			<!-- <p :class="{'hidden' : total === 0}">Total ${{total}}</p> -->
			<!-- array based mult-classes toggle -->
			<p :class="[total === 0 ? 'hidden' : '', total > 150 ? 'max' : '']">
				Total ${{ total }}
			</p>
		</div>
	</div>
	<div id="main">
		<div>
			<h1>{{ title.toUpperCase() }}</h1>
			<p>{{ artist.split("").join("-") }}</p>
			<small>Learning variables</small>
			<br />

			<h4 v-if="tickets === 0">Ugh please add some tickets urgently !!!</h4>
			<h4 v-else-if="tickets < 5">very few tickets are left, HURRY!</h4>
			<h1>There are {{ tickets === 0 ? "no" : tickets }} left.</h1>
			<small>Learning conditionals</small>

			<div style="padding: 1em; background-color: black">
				<p v-if="isGood === true">I'm Good</p>
				<p v-else>I'm Bad</p>
			</div>
		</div>
		<div>
			<img :src="image" :width="imageWidth * 2.5" alt="Vue Logo" />
		</div>
		<div>
			<h1>My Skills</h1>
			<small>Learning loops thru array</small>
			<ul>
				<li v-for="(skill, index) in skills" :key="skill">
					{{ index }} - {{ skill }}
				</li>
			</ul>
		</div>
		<div>
			<h1>Bio</h1>
			<small>Learning loops thru obj</small>
			<div
				style="display: flex; gap: 10px"
				v-for="(value, key, index) of bio"
				:key="index"
			>
				<p>{{ index + 1 }}.</p>
				<p>{{ key }}</p>
				<p style="color: lightgray">{{ value }}</p>
			</div>
		</div>
	</div>
	<div id="store">
		<h1 style="text-align: center">Purchase my over-priced goodies 🙂</h1>
		<p id="error" v-if="error">
			Sorry, we are having some issues while fetching data from our server.
			Please try again later!
		</p>
		<div id="products">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:name="product.title"
				:price="product.price"
				:image="product.thumbnail"
				:stock="product.stock"
				:product="product"
				@add-to-cart="addToCart"
			/>
		</div>
		<div style="width: 60%; margin: 1em auto; display: grid; gap: 10px">
			<h1>Hello, please write to us!</h1>
			<input type="text" v-model="message" placeholder="Your message" />
			<p>preview: {{ message }}</p>
		</div>
	</div>
</template>

<script>
import ProductCard from "./components/product.vue";

export default {
	name: "App",
	components: {
		ProductCard,
	},
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
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: "Poppins", sans-serif;
	background-color: gray;
	min-height: 100vh;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
	color: white;
}

#nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
	background-color: #333;
}

#main {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 4rem;
}

#main > div {
	border-right: 1px solid white;
	padding: 1rem;
	height: 230px;
	display: grid;
	justify-content: center;
}

#nav > div {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

#products {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	padding: 1rem;
}

#product {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#error {
	text-align: center;
	font-size: 22px;
	margin: 10px 0;
	padding: 2em;
	color: rgba(255, 0, 0, 0.8);
	background-color: #333;
}

button {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.5rem;
	background-color: #eee;
	color: black;
	cursor: pointer;
}

.hidden {
	display: none;
}

.max {
	background-color: red;
	color: white;
}

.disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
</style>
