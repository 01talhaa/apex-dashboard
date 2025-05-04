<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :shop="shop" :menuItems="menuItems"/>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto transition-all duration-300">
      <!-- Header (Sticky at Top, Outside of Main) -->
      <!-- Dashboard Content -->
      <main class="p-4 mt-0.5">
        <div class="min-h-screen bg-white p-6">
          <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 class="text-3xl font-semibold text-blue-500 text-center mb-6">🛍 Manage Shop</h2>

            <!-- Success Message -->
            <p v-if="message" class="text-green-700 font-medium text-center bg-green-100 p-2 rounded mb-4">
              {{ message }}
            </p>

            <div class="grid grid-cols-1 gap-4">
              <!-- Business Name -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Business Name</label>
                <input v-model="shop.name" type="text"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Business Type -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Business Type</label>
                <input v-model="shop.type" type="text"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Shop Email -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Admin Email</label>
                <input v-model="shop.email" type="email"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Shop password -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Admin Password</label>
                <input v-model="shop.password" type="password"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Admin Phone Number</label>
                <input v-model="shop.phone" type="text"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Country</label>
                <input v-model="shop.country" type="text"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Shop Address</label>
                <input v-model="shop.address" type="text"
                       class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"/>
              </div>

              <!-- Topbar Announcement -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Topbar Announcement</label>
                <textarea v-model="shop.announcement"
                          class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"></textarea>
              </div>


              <!-- Update Button -->
              <button @click="updateShopInfo"
                      class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 mt-4 rounded-lg hover:shadow-xl transition transform hover:scale-105">
                Update Shop Info
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import QrcodeVue from "qrcode.vue";
import Sidebar from './Sidebar.vue';
import api from "@/utils/api"; // Adjust the import path as necessary

const menuItems = [
  {name: "Customers", path: "/customers", icon: "Package"},
  {name: "Lucky Spin", path: "/luckyspin", icon: "BarChart"},
  {name: "Leaderboard", path: "/leaderboard", icon: "BarChart"},
  {name: "Billing", path: "/billing", icon: "BarChart"},
  {name: "Transaction ID", path: "/transaction-id", icon: "BarChart"},
];

const shop = ref([
  {
    businessId: "",
    name: "",
    type: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    announcement: "",
    logo: "",
    password: "",
  },
]);

const shopUrl = ref(""); // Shop page URL
const message = ref(""); // Success message

// Create router instance
const router = useRouter();

/* ---------------------- Load Data from Local Storage on Mount ---------------------- */
onMounted(() => {
  if (localStorage.getItem("shopData")) {
    getShopDetails(); // Fetch shop details from API
  }
  const savedShop = localStorage.getItem("shopData");
  if (savedShop) {
    shop.value = JSON.parse(savedShop); // Populate shop data from localStorage
  }
  shopUrl.value = window.location.origin + "/shop"; // Adjust shop page link
});

/* ---------------------- Handle Logo Upload ---------------------- */
const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      shop.value.logo = e.target.result; // Save as Base64
      // Store the updated shop data in localStorage
      localStorage.setItem("shopData", JSON.stringify(shop.value));
    };
    reader.readAsDataURL(file);
  }
};

/* ---------------------- Update Shop Info ---------------------- */
const updateShopInfo = async () => {
  try {
    const payload = {
      business_name: shop.value.name,
      business_type: shop.value.type,
      shop_email: shop.value.email,
      shop_phone: shop.value.phone,
      country: shop.value.country,
      shop_address: shop.value.address,
      topbar_announcement: shop.value.announcement,
      password: shop.value.password,
    };

    await api.post('/shop-details', payload);

    message.value = "✅ Shop information updated successfully!";
    setTimeout(() => {
      message.value = "";
      router.push("/dashboard");
    }, 1000);
  } catch (err) {
    message.value = "❌ Failed to update shop info!";
    console.error(err);
  }
};

const getShopDetails = async () => {
  try {
    const response = await api.get('/shop-details');
    const data = response.data?.data;

    shop.value = {
      name: data.business_name || "",
      type: data.business_type || "",
      email: data.shop_email || "",
      phone: data.shop_phone || "",
      country: data.country || "",
      address: data.shop_address || "",
      announcement: data.topbar_announcement || "",
      logo: "", // Assuming logo will be handled separately
    };

    localStorage.setItem("shopData", JSON.stringify(shop.value));
  } catch (err) {
    console.error("❌ Error fetching shop details:", err);
  }
};
</script>

<style scoped>
/* Scoped Styles for ManageShop component */
</style>