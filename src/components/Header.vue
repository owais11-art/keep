<script setup>
    const emit = defineEmits(['onSlide'])
    const slide = () => emit('onSlide')
</script>
<template>
    <header>
        <div class="hamburger" @click="slide">
            <svg focusable="false" viewBox="0 0 24 24" style="width:30px;height:30px; fill: #fff"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </div>
        <div class="logo">
            <div class="logo-img">
                <img class="gb_Hc gb_de" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" srcset="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" style="width:40px;height:40px">
            </div>
            <div class="logo-name">Keep Clone</div>
        </div>
    </header>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    header{
        #flex({
            align-items: center;
            gap: 10px;
        });
        padding: 10px 20px;
        border-bottom: 3px solid #colors[border];
        .hamburger{
            cursor: pointer;
            @media(max-width: 900px){
                display: none;
            }
        }
        .logo{
            #flex({
                align-items: center;
            });
            .logo-name{
                color: #colors[light];
                font-size: 22px;
                font-weight: 700;
            }
        }
    }
</style>