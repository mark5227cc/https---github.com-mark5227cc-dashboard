// 初始化儀表板
document.addEventListener('DOMContentLoaded', function() {
    // 設置 Highcharts 淺色主題
    Highcharts.setOptions({
        colors: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
        chart: {
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                color: '#0f172a'
            }
        },
        title: {
            style: {
                color: '#0f172a',
                fontWeight: '600',
                fontSize: '16px'
            }
        },
        subtitle: {
            style: {
                color: '#64748b',
                fontSize: '12px'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: '#64748b',
                    fontSize: '12px'
                }
            },
            lineColor: '#e2e8f0',
            tickColor: '#e2e8f0'
        },
        yAxis: {
            labels: {
                style: {
                    color: '#64748b',
                    fontSize: '12px'
                }
            },
            gridLineColor: '#f1f5f9',
            lineColor: '#e2e8f0',
            tickColor: '#e2e8f0',
            title: {
                style: {
                    color: '#64748b',
                    fontSize: '12px'
                }
            }
        },
        legend: {
            itemStyle: {
                color: '#475569',
                fontSize: '12px'
            }
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            borderRadius: 8,
            style: {
                color: '#0f172a',
                fontSize: '12px'
            },
            shadow: true
        }
    });

    initializeCharts();
    updateLastUpdateTime();
    
    // 每30秒更新一次時間
    setInterval(updateLastUpdateTime, 30000);
});

// 更新最後更新時間
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-TW', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    const element = document.getElementById('lastUpdate');
    if (element) {
        element.textContent = timeString;
    }
}

// 初始化所有圖表
function initializeCharts() {
    createUtilizationChart();
    createSuccessRateChart();
    createHourlyQuestionsChart();
}

// 1. 各項問答利用率圖表
function createUtilizationChart() {
    Highcharts.chart('utilizationChart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: 280
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>使用次數: <b>{point.y}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
                    style: {
                        color: '#475569',
                        fontSize: '11px',
                        fontWeight: '500'
                    },
                    distance: 20
                },
                showInLegend: false,
                size: '80%',
                innerSize: '40%'
            }
        },
        series: [{
            name: '利用率',
            colorByPoint: true,
            data: [{
                name: '訂單查詢',
                y: 1234,
                sliced: true,
                selected: true
            }, {
                name: '商品資訊',
                y: 987
            }, {
                name: '退換貨',
                y: 756
            }, {
                name: '配送追蹤',
                y: 623
            }, {
                name: '會員服務',
                y: 534
            }, {
                name: '付款問題',
                y: 445
            }, {
                name: '其他',
                y: 321
            }]
        }]
    });
}

// 2. 本週與本月答題成功率圖表
function createSuccessRateChart() {
    Highcharts.chart('successRateChart', {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            height: 280
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '成功率 (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:12px;font-weight:600">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0;padding-right:8px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.15,
                borderWidth: 0,
                borderRadius: 4,
                groupPadding: 0.1
            }
        },
        series: [{
            name: '本週',
            data: [94.5, 96.2, 93.8, 95.1, 97.3, 92.7, 94.9],
            color: '#3b82f6'
        }, {
            name: '本月平均',
            data: [92.1, 94.5, 91.8, 93.2, 95.7, 90.3, 92.8],
            color: '#06b6d4'
        }],
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            itemStyle: {
                fontSize: '12px',
                fontWeight: '500'
            }
        }
    });
}

// 3. 24小時問題分布圖表
function createHourlyQuestionsChart() {
    Highcharts.chart('hourlyQuestionsChart', {
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            height: 300
        },
        title: {
            text: null
        },
        xAxis: {
            categories: [
                '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
            ],
            tickInterval: 2
        },
        yAxis: {
            title: {
                text: '問題數量'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> 個問題',
            shared: true
        },
        plotOptions: {
            areaspline: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgba(59, 130, 246, 0.2)'],
                        [1, 'rgba(59, 130, 246, 0.02)']
                    ]
                },
                marker: {
                    radius: 3,
                    fillColor: '#3b82f6',
                    lineColor: '#ffffff',
                    lineWidth: 2
                },
                lineWidth: 2,
                lineColor: '#3b82f6',
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                threshold: null
            }
        },
        series: [{
            name: '問題數量',
            data: [12, 8, 5, 3, 2, 4, 15, 35, 67, 89, 112, 134, 
                   156, 142, 128, 145, 167, 178, 156, 134, 89, 67, 45, 28],
            color: '#3b82f6'
        }],
        legend: {
            enabled: false
        }
    });
}

// 模擬數據更新（可用於實際API整合）
function updateDashboardData() {
    console.log('更新儀表板數據...');
    
    // 模擬數據變化
    const charts = Highcharts.charts;
    charts.forEach(chart => {
        if (chart && chart.series) {
            // 可以在這裡更新圖表數據
        }
    });
}

// 響應式調整
window.addEventListener('resize', function() {
    setTimeout(function() {
        Highcharts.charts.forEach(function(chart) {
            if (chart) {
                chart.reflow();
            }
        });
    }, 100);
});

// 添加互動功能
document.addEventListener('DOMContentLoaded', function() {
    // 重新整理按鈕
    const refreshButton = document.querySelector('.button--refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            updateDashboardData();
            updateLastUpdateTime();
            
            // 添加載入效果
            this.style.opacity = '0.6';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    }

    // 匯出報告按鈕
    const exportButton = document.querySelector('.button--export');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            // 模擬匯出功能
            alert('報告匯出功能正在開發中...');
        });
    }

    // 樹狀結構互動
    const treeLinks = document.querySelectorAll('.tree-branch-link');
    treeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除其他 active 狀態
            treeLinks.forEach(l => l.classList.remove('active'));
            
            // 添加當前項目的 active 狀態
            this.classList.add('active');
            
            // 這裡可以添加根據選擇更新圖表的邏輯
            console.log('選擇了:', this.textContent);
        });
    });

    // 快速操作按鈕
    const quickActionButtons = document.querySelectorAll('.button--secondary');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log('執行操作:', action);
            
            // 模擬操作執行
            this.style.opacity = '0.6';
            this.textContent = '執行中...';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.textContent = action;
            }, 1500);
        });
    });
});

// 添加數據刷新功能
function refreshChartData(chartId, newData) {
    const chart = Highcharts.charts.find(c => c && c.container.id === chartId);
    if (chart) {
        chart.series[0].setData(newData, true);
    }
}

// 格式化數字顯示
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
} 