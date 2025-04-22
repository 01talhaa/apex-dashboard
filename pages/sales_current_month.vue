<template>
  <div>
    <h1>Sales Data</h1>
  </div>
</template>

<script setup>
onMounted(() => {
  // Simulated sales data for the current and previous month
  const salesData = {
    thisMonth: {
      cashOnDelivery: 200,
      mobilePayment: 350,
      other: 150,
    },
    previousMonth: {
      cashOnDelivery: 180,
      mobilePayment: 300,
      other: 130,
    },
  };

  // Save to localStorage (for demo purposes)
  localStorage.setItem("salesData", JSON.stringify(salesData));
});
</script>

<style>
/* Add your styles here */
</style>
