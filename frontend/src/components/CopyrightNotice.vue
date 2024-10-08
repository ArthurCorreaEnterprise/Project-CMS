<template>
    <footer class="copyright-notice">
        <p>
            &copy; {{ currentYear }} {{ companyName }}. All rights reserved.
        </p>
    </footer>
</template>

<script>
export default {
    name: "CopyrightNotice",
    data() {
        return {
            currentYear: new Date().getFullYear(),
            companyName: "Your Company Name",
        };
    },
};
</script>

<style scoped>
.copyright-notice {
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    color: #555;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
}
</style>