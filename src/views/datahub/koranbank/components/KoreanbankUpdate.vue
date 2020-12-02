<!-- =========================================================================================
    File Name: DropdownOptionsBasic.vue
    Description: Basic dropdown options in select component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="갱신관리" no-shadow card-border>
      <vs-divider/>
      <!-- chip -->
        <vs-chip color="success"></vs-chip>
        <div>
            <p class="my-3"><code> 정상</code></p>
            <p class="my-3">최근 갱신일: <code>2020-10-15 13:12:32</code></p>
            <p class="my-3">갱신 주기: <code>년</code> 
            <vs-button class="ml-auto mt-7 flex flex-wrap items-center justify-end">Update</vs-button>
            </p>
        </div>
        <!-- <div class="vx-row">
            <div class="vx-col w-full">
                <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2">Excel Download</vs-button>
                </div>
            </div>
        </div> -->

    </vx-card>
</template>
<script>

export default{
  components: {
  }
}
</script>
