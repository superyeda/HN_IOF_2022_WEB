<template>
	<view>
		<view class="example-body">
			<uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"find",
		data() {
			return {
				datetimerange: [],
			};
		},

	}
</script>

<style>
	.example-body {
		background-color: #fff;
		padding: 10px;
	}
</style>