<template>
	<div id="product">
		<img :src="image" width="150" height="100" alt="product logo" />
		<h3>{{ name }}</h3>
		<p>$ {{ price }}</p>
		<p>Stock: {{ itemStock }}</p>
		<div>
			<select :class="{ disabled: itemStock === 0 }" v-model="amount">
				<option v-for="n in itemStock" :value="n" :key="n">{{ n }}</option>
			</select>
			<button :class="{ disabled: itemStock === 0 }" @click="addToCart">
				Add to Cart
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		name: String,
		price: Number,
		image: String,
		stock: Number,
		product: Object,
	},
	data() {
		return {
			itemStock: this.stock,
			amount: 1,
		};
	},
	methods: {
		addToCart() {
			if (this.itemStock === 0) return;
			// send the product id and amount to the parent component, so parent can update the overall product state
			this.$emit("add-to-cart", { id: this.product.id, amount: this.amount });
			this.itemStock -= this.amount;
			this.amount = 1;
		},
	},
};
</script>

<style scoped></style>
