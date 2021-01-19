<style global lang="postcss">
    .text-gradient {
        @apply bg-clip-text;
        @apply text-transparent;
    }

    .pattern-dots {
        background-image: radial-gradient(currentColor 1px, transparent 1px);
        background-size: calc(20 * 1px) calc(20 * 1px);
    }
</style>