<template>
    <div class="home-container">
        <header class="header">
            <h1>이상형 월드컵</h1>
            <p>최고의 이상형을 선택하세요!</p>
        </header>
        <section class="content">
            <div class="intro">
                <p>여러 후보 중에서 당신의 이상형을 골라보세요. 매 라운드마다 두 후보 중 하나를 선택할 수 있습니다. 최종적으로 당신이 선택한 최고의 이상형이 결정됩니다!</p>
            </div>
            <div class="start-button">
                <RouterLink to="/worldcup" class="button">시작하기</RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    font-size: 36px;
    color: #333;
}

.header p {
    font-size: 18px;
    color: #666;
}

.content {
    width: 100%;
    max-width: 800px;
    text-align: center;
}

.intro {
    margin-bottom: 30px;
}

.intro p {
    font-size: 16px;
    color: #555;
    line-height: 1.5;
}

.start-button {
    display: flex;
    justify-content: center;
}

.button {
    display: inline-block;
    padding: 15px 30px;
    font-size: 18px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}
</style>
