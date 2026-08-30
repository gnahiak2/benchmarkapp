use axum::{
    Json, Router,
    routing::{get, post},
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Debug, Deserialize)]
struct SubmitResult {
    cpu: f64,
    memory: f64,
    gpu: f64,
    browser: f64,
    overall: f64,
}

#[derive(Debug, Serialize)]
struct ApiResponse {
    success: bool,
    message: String,
}

async fn health() -> &'static str {
    "API OK"
}

async fn submit_result(Json(result): Json<SubmitResult>) -> Json<ApiResponse> {
    println!("{result:#?}");

    Json(ApiResponse {
        success: true,
        message: "Result received".to_string(),
    })
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/health", get(health))
        .route("/api/results", post(submit_result));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    println!("API listening on {addr}");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();

    axum::serve(listener, app).await.unwrap();
}
