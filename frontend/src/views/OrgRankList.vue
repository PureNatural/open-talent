<template>
  <div class="rank-list">
    <!-- Header -->
    <NavMenu></NavMenu>

    <!-- Main Content -->
    <div>
      <el-main>
        <h2 class="title">组织贡献度排行榜</h2>
        <div style="margin: 0 30px">
          <el-table
              :row-class-name="tableRowClassName"
              :header-cell-style="{ color: '#ffffff', fontSize: '18px', backgroundColor: '#111E33' }"
              :data="paginatedOrganizations"
              style="width: 100%"
              size="medium"
          >
            <el-table-column prop="rank" label="排名"></el-table-column>
            <el-table-column prop="name" label="高校名称"></el-table-column>
            <el-table-column prop="openrankValue" label="OpenRank">
              <template slot="header">
                <span>OpenRank</span>
                <el-button
                    type="text"
                    icon="el-icon-caret-top"
                    plain
                    @click="setSortOrder('asc')"
                    :class="{ active: sortOrder === 'asc' }"
                ></el-button>
                <el-button
                    type="text"
                    icon="el-icon-caret-bottom"
                    @click="setSortOrder('desc')"
                    :class="{ active: sortOrder === 'desc' }"
                ></el-button>
              </template>
              <template slot-scope="scope">
                60.0
                <img src="../assets/decrease.svg" style="margin: 0 7px">
                10.0
              </template>
            </el-table-column>

            <el-table-column prop="openrankValue" label="参赛学生数">
              <template slot="header">
                <span>参赛学生数</span>
                <el-button
                    type="text"
                    icon="el-icon-caret-top"
                    plain
                    @click="setSortOrder('asc')"
                    :class="{ active: sortOrder === 'asc' }"
                ></el-button>
                <el-button
                    type="text"
                    icon="el-icon-caret-bottom"
                    @click="setSortOrder('desc')"
                    :class="{ active: sortOrder === 'desc' }"
                ></el-button>
              </template>
              <template slot-scope="scope">
                60.0
                <img src="../assets/decrease.svg" style="margin: 0 7px">
                10.0
              </template>
            </el-table-column>

            <el-table-column prop="openrankValue" label="人均OpenRank">
              <template slot="header">
                <span>人均OpenRank</span>
                <el-button
                    type="text"
                    icon="el-icon-caret-top"
                    plain
                    @click="setSortOrder('asc')"
                    :class="{ active: sortOrder === 'asc' }"
                ></el-button>
                <el-button
                    type="text"
                    icon="el-icon-caret-bottom"
                    @click="setSortOrder('desc')"
                    :class="{ active: sortOrder === 'desc' }"
                ></el-button>
              </template>
              <template slot-scope="scope">
                3.2
                <img src="../assets/increase.svg" style="margin: 0 7px">
                1.0
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="organizations.length"
          ></el-pagination>
        </div>
      </el-main>
    </div>


    <!-- Footer -->
    <el-footer>
      <div class="footer-content">
        <img src="/images/lab-logo.png" alt="Xlab Logo" class="footer-logo" />
        <p>官方支持</p>
        <p>Copyright © 2024 X-lab</p>
      </div>
    </el-footer>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "OrganizationContributionRank",
  components: { NavMenu },
  data() {
    return {
      organizations: [],
      currentPage: 1,
      pageSize: 10,
      sortOrder: "desc", // 默认降序
    };
  },
  computed: {
    sortedOrganizations() {
      let sorted = [...this.organizations];
      if (this.sortOrder === "asc") {
        sorted.sort((a, b) => a.openrankValue - b.openrankValue);
      } else {
        sorted.sort((a, b) => b.openrankValue - a.openrankValue);
      }
      return sorted;
    },
    paginatedOrganizations() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.sortedOrganizations.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchOrganizations() {
      this.$http
          .get("/org/search")
          .then((response) => {
            console.log("组织数据：", response.data);
            const organizations = response.data.data;
            if (Array.isArray(organizations)) {
              this.organizations = organizations.map((org, index) => ({
                ...org,
                rank: index + 1,
              }));
            } else {
              console.error("组织数据格式不正确");
              this.organizations = [];
            }
          })
          .catch((error) => {
            console.error("获取组织数据失败：", error);
            this.organizations = [];
          });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    setSortOrder(order) {
      this.sortOrder = order;
    },
    goToDetail() {
      this.$router.push({ name: "OrganizationProfile" });
    },
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 === 0 ? "even-row" : "odd-row";
    },
  },
  mounted() {
    this.fetchOrganizations();
  },
};
</script>


<style>
.rank-list {
  justify-content: center; /* 水平居中 */
  text-align: center;

}

.rank-list .title{
  color: #ACC5DB;
  margin: 0 auto;
}

.rank-list .el-main{
  display: inline-block;
  background-color: #111E33; /* 深蓝色背景 */
  border-radius: 15px; /* 圆角半径 */
  padding: 50px 0;
  width: 70%;
}

.el-header {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.el-menu {
  flex: 1;
  margin-left: 20px;
}

.el-main {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 使内容居中 */
  width: 100%; /* 确保主内容占满宽度 */
}

.filters {
  display: flex;
  justify-content: center; /* 使过滤按钮居中 */
  text-align: center;
  margin-bottom: 20px; /* 添加一些底部间距 */
}

.el-footer {
  text-align: center;
  padding: 30px 0;
  background: #fff;
  border-top: 1px solid #eaeaea;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.el-button--primary {
  color: #fff;
  background-color: #131313;
  border-color: #cdcdcd;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #e8e8e8;
  border-color: #131313;
  color: #131313;
}

.el-button--primary.is-plain {
  color: #5f5f5f;
  background: #fff;
  border-color: #cdcdcd;
}

.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover {
  background: #131313;
  border-color: #131313;
  color: #fff;
}


.el-pager li {
  background: #111E33;
}

.el-pagination{
  text-align: center;
}

.el-pagination button:disabled {
  background-color: #111E33;
  color: #ACC5D3
}

.el-pagination button {
  background-color: #111E33 !important;
  color: #FFF !important;
}

.el-pager li.active {
  color: #FFF !important;
}

.el-pager li {
  color: #ACC5DB !important;
  background-color: #111E33 !important;
}

.el-pager li:hover {
  color: #FFF !important;
  background-color: #111E33 !important;
}

.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #FFF;
}

.el-table .even-row {
  background-color:#213046 !important;
  color: #FFF;
  font-size: 16px;
}

.el-table .odd-row {
  background-color:#111E33 !important;
  color: #FFF;
  font-size: 16px;
}

.el-table tbody tr:hover>td {
  background-color: transparent !important;
}
</style>