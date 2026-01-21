<script setup lang="ts">

</script>

<template>
<section class="lg:grid lg:place-content-center">
    <div class="mx-auto w-screen max-w-7xl px-4 sm:px-6 sm:py-24 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-prose text-center">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
            My
            <strong class="text-indigo-600"> Portfolio </strong>
        </h1>

        <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Building modern web applications with Vue 3 & TypeScript
        </p>

        <div class="mt-4 flex justify-center gap-4 sm:mt-6">
            <RouterLink :to="{name: 'tasks'}" class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
            Browse Dashboard
            </RouterLink>

            <a class="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900" href="#skills">
            View Skills
            </a>
        </div>
        </div>
    </div>
</section>
</template>

<style scoped></style>
