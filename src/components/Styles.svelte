<script>
    import { proMode } from "../stores/main"
    import BasicModeStyle from "./styles/BasicModeStyle.svelte";
    import ProModeStyle from "./styles/ProModeStyle.svelte";
</script>

{#if $proMode}
    <ProModeStyle />
{:else}
    <BasicModeStyle />
{/if}