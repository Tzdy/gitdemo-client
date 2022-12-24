<template>
  <div
    @mouseover="mouseoverCalendarTooltip"
    ref="tooltipBox"
    class="border py-2 calendar-box position-relative"
  >
    <div
      :class="tooltipTransformClass"
      :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      class="calendar-tooltip tooltipped tooltipped-no-delay"
      :aria-label="'Contributes is ' + aria_label + '.'"
    ></div>
    <div
      class="
        mx-md-2 mx-3
        d-flex
        flex-column flex-items-end flex-xl-items-center
        overflow-hidden
        pt-1
        height-full
        text-center
      "
    >
      <svg width="823" height="128">
        <g transform="translate(15, 25)">
          <g
            v-for="(col, index) in calendar"
            :key="index"
            :transform="'translate(' + index * 16 + ', 0)'"
          >
            <rect
              v-for="(row, rowIndex) in col"
              :key="rowIndex"
              width="11"
              height="11"
              :x="16 - index"
              :y="rowIndex * 15"
              class="ContributionCalendar-day position-relative"
              rx="2"
              ry="2"
              :data-count="row.count"
              :data-date="formatTime(row)"
              :data-level="row.level"
            ></rect>
          </g>
          <g v-if="newColItem" transform="translate(832, 0)">
            <rect
              v-for="(row, rowIndex) in newCol"
              :key="rowIndex"
              width="11"
              height="11"
              :x="-36"
              :y="rowIndex * 15"
              class="ContributionCalendar-day"
              rx="2"
              ry="2"
              :data-date="formatTime(row)"
            ></rect>
          </g>
          <text
            v-for="item in monthArray"
            :x="item.x"
            y="-8"
            class="ContributionCalendar-label"
          >
            {{ month[item.val] }}
          </text>
          <text
            text-anchor="start"
            class="ContributionCalendar-label"
            dx="-15"
            dy="10"
          >
            Mon
          </text>
          <text
            text-anchor="start"
            class="ContributionCalendar-label"
            dx="-15"
            dy="40"
          >
            Wed
          </text>
          <text
            text-anchor="start"
            class="ContributionCalendar-label"
            dx="-15"
            dy="70"
          >
            Fri
          </text>
          <text
            text-anchor="start"
            class="ContributionCalendar-label"
            dx="-15"
            dy="98"
          >
            Sun
          </text>
        </g>
      </svg>
      <div class="width-full f6 px-0 px-md-5 py-1">
        <div class="width-full clearfix">
          <div class="float-right color-fg-muted f6">
            Less
            <svg width="10" height="10" class="d-inline-block ml-1">
              <rect
                width="10"
                height="10"
                class="ContributionCalendar-day"
                rx="2"
                ry="2"
                data-level="0"
                no-tooltip
              ></rect>
            </svg>
            <svg width="10" height="10" class="d-inline-block ml-1">
              <rect
                width="10"
                height="10"
                data-level="1"
                class="ContributionCalendar-day"
                rx="2"
                ry="2"
                no-tooltip
              ></rect>
            </svg>
            <svg width="10" height="10" class="d-inline-block ml-1">
              <rect
                width="10"
                height="10"
                data-level="2"
                class="ContributionCalendar-day"
                rx="2"
                ry="2"
                no-tooltip
              ></rect>
            </svg>
            <svg width="10" height="10" class="d-inline-block ml-1">
              <rect
                width="10"
                height="10"
                data-level="3"
                class="ContributionCalendar-day"
                rx="2"
                ry="2"
                no-tooltip
              ></rect>
            </svg>
            <svg width="10" height="10" class="d-inline-block ml-1">
              <rect
                width="10"
                height="10"
                data-level="4"
                class="ContributionCalendar-day"
                rx="2"
                ry="2"
                no-tooltip
              ></rect>
            </svg>
            More
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "@vue/composition-api";

export default defineComponent({
  setup() {
    function formatTime(date: Date) {
      return `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(
        2,
        "0"
      )}-${(date.getDate() + "").padStart(2, "0")}`;
    }
    // 鼠标悬停在方块上时显示的。
    const aria_label = ref("");
    // 最后一列有几行
    const newColItem = new Date().getDay();
    // 前 52 列 + 最后一列 = 53列
    const col = 52;
    const originDate = new Date(
      Date.now() -
        1000 * 60 * 60 * 24 * 52 * 7 -
        1000 * 60 * 60 * 24 * (newColItem - 1)
    );
    function nextMonth(date) {
      const newDate = new Date(date);
      if (date.getMonth() + 1 === 12) {
        newDate.setFullYear(newDate.getFullYear() + 1);
        newDate.setMonth(0);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      newDate.setDate(1);
      return newDate;
    }
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const calendar = reactive([]);
    const newCol = reactive([]);
    const monthArray = reactive([]);
    // 每一个方块中的对象
    let beforeDate = originDate;
    // 用来计算顶部月份的。表示下个月。beforeDate的月份累加到下个月时加1
    let nextDate = nextMonth(beforeDate);
    // 顶部月份距离最最左侧的偏移
    let beforeMonthX = 0;
    // 如果最左侧的第一个方块中的date距离下个月大于等于21天，就显示这个月。
    // 否则显示下个月
    if (
      new Date(nextMonth(beforeDate).getTime() - 1000).getDate() -
        beforeDate.getDate() >=
      21
    ) {
      monthArray.push({
        x: beforeMonthX,
        val: originDate.getMonth(),
      });
    }

    for (let i = 0; i < col; i++) {
      const array = [];
      beforeMonthX += 15;
      for (let j = 0; j < 7; j++) {
        array.push(beforeDate);
        if (
          beforeDate.getMonth() === nextDate.getMonth() &&
          beforeDate.getFullYear() === nextDate.getFullYear()
        ) {
          monthArray.push({
            x: beforeMonthX,
            val: beforeDate.getMonth(),
          });
          nextDate = nextMonth(nextDate);
        }
        beforeDate = new Date(beforeDate.getTime() + 1000 * 60 * 60 * 24);
      }
      
      calendar.push(array);
    }
    for (let j = 0; j < newColItem; j++) {
      newCol.push(beforeDate);
      beforeDate = new Date(beforeDate.getTime() + 1000 * 60 * 60 * 24);
    }
    const tooltipBox = ref<HTMLElement>(null);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const tooltipTransform = ref<"middle" | "left" | "right">("middle");
    const tooltipTransformClass = computed(() => {
      const t = tooltipTransform.value;
      const classProperty = {
        "tooltipped-nw": t === "left",
        "tooltipped-n": t === "middle",
        "tooltipped-ne": t === "right",
      };
      return classProperty;
    });
    function mouseoverCalendarTooltip(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('no-tooltip')) {
        return ;
      }
      const scrollWidth = tooltipBox.value.scrollWidth;
      const visibleRectNum =
        scrollWidth >= 823 ? 53 : Math.ceil(scrollWidth / 16);
      // 当屏幕宽度达到xl后，Calendar的左边就不是贴着 Calendar-Box的左边了。所以需要保存Calendar-Box 左边缘到 Calendar左边缘的距离。
      const hideWidht = scrollWidth >= 823 ? scrollWidth - 823 : 0;
      const tooltipBoxX = tooltipBox.value.getBoundingClientRect().x;
      const tooltipBoxY = tooltipBox.value.getBoundingClientRect().y;
      if (target.hasAttribute("rx")) {
        console.log(target.dataset);
        aria_label.value = target.dataset["date"];
        const { x, y } = target.getBoundingClientRect();
        tooltipX.value = x - tooltipBoxX;
        tooltipY.value = y - tooltipBoxY;
        if (visibleRectNum <= 7) {
          console.log("no display");
        } else if (visibleRectNum > 7 && visibleRectNum <= 14) {
          if (tooltipX.value <= 7 * 16) {
            tooltipTransform.value = "right";
          } else {
            tooltipTransform.value = "left";
          }
        } else {
          if (tooltipX.value <= hideWidht + 7 * 16) {
            tooltipTransform.value = "right";
          } else if (tooltipX.value >= (visibleRectNum - 7) * 16) {
            tooltipTransform.value = "left";
          } else {
            tooltipTransform.value = "middle";
          }
        }
      }
    }

    return {
      formatTime,
      mouseoverCalendarTooltip,
      tooltipTransformClass,
      tooltipX,
      tooltipY,
      aria_label,
      calendar,
      newColItem,
      monthArray,
      newCol,
      month,
      tooltipBox,
    };
  },
});
</script>

<style scoped>
.ContributionCalendar-day[data-level="1"] {
  fill: var(--color-calendar-graph-day-L1-bg) !important;
}
.ContributionCalendar-day[data-level="2"] {
  fill: var(--color-calendar-graph-day-L2-bg) !important;
}
.ContributionCalendar-day[data-level="3"] {
  fill: var(--color-calendar-graph-day-L3-bg) !important;
}
.ContributionCalendar-day[data-level="4"] {
  fill: var(--color-calendar-graph-day-L4-bg) !important;
}
.ContributionCalendar-day {
  --color-calendar-graph-day-L1-bg: #9be9a8;
  --color-calendar-graph-day-L2-bg: #40c463;
  --color-calendar-graph-day-L3-bg: #30a14e;
  --color-calendar-graph-day-L4-bg: #216e39;
  fill: #ebedf0;
  outline: 1px rgba(27, 31, 35, 0.06) solid;
  outline-offset: -1px;
}
.ContributionCalendar-label {
  font-size: 12px;
}
.calendar-box {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.calendar-tooltip {
  width: 11px;
  height: 11px;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}
.tooltipped::after {
  z-index: 9999;
}
.tooltipped::before {
  z-index: 9999;
}
</style>
