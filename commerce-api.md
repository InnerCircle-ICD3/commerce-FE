
[swagger editor](https://editor.swagger.io/) 접속 후 yaml 내용을 에디터에 복붙해서 확인해주세요.


```yaml
openapi: 3.0.1
info:
  title: E-commerce API
  version: 1.0.0

tags:
  - name: Product
    description: 상품 API
  - name: Cart
    description: 장바구니 API
  - name: Order
    description: 주문-사용자 API
  - name: Order-Admin
    description: 상품-관리자 API
  - name: Payment
    description: 결제-사용자 API
  - name: Payment-Admin
    description: 결제-관리자 API
  - name: Review
    description: 리뷰-사용자 API
  - name: Review-Admin
    description: 리뷰-관리자 API

paths:
  # 상품
  /product-categories:
    get:
      tags: [Product]
      summary: 상품 카테고리 목록 조회
      responses:
        '200':
          description: 카테고리 목록
          content:
            application/json:
              schema:
                type: object
                properties:
                  intensities:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'
                  cupSizes:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'
  /product-status:
    get:
      tags: [Product]
      summary: 상품 판매 상태 목록 조회
      responses:
        '200':
          description: 판매 상태 목록
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: array
                    items:
                      $ref: '#/components/schemas/ProductStatus'
  /products:
    get:
      tags: [Product]
      summary: 상품 목록 조회
      parameters:
        - in: query
          name: name
          schema:
            type: string
        - in: query
          name: intensityId
          schema:
            type: integer
        - in: query
          name: cupSizeId
          schema:
            type: integer
        - in: query
          name: status
          schema:
            type: string
        - in: query
          name: page
          schema:
            type: integer
        - in: query
          name: size
          schema:
            type: integer
        - in: query
          name: sort
          schema:
            type: string
            example: price,asc
      responses:
        '200':
          description: 상품 목록
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ProductResponse'

    post:
      tags: [Product]
      summary: 상품 등록
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductRequest'
      responses:
        '201':
          description: 등록 성공
  /products/{productId}:
    get:
      tags: [Product]
      summary: 상품 상세 조회
      parameters:
        - in: path
          name: productId
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: 상품 상세 정보
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductResponse'

    put:
      tags: [Product]
      summary: 상품 수정
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: productId
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductUpdateRequest'
      responses:
        '200':
          description: 수정 성공

    delete:
      tags: [Product]
      summary: 상품 삭제
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: productId
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: 삭제 성공
  
  # 장바구니
  /cart:
    get:
      summary: 장바구니 조회
      tags: [Cart]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: 장바구니 항목 조회 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CartResponse'
  /cart/items:
    post:
      summary: 장바구니에 상품 추가
      tags: [Cart]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                productId:
                  type: integer
                quantity:
                  type: integer
              required: [productId, quantity]
      responses:
        '201':
          description: 장바구니 항목 추가됨
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CartItem'
    delete:
      summary: 장바구니 비우기
      tags: [Cart]
      security:
        - bearerAuth: []
      responses:
        '204':
          description: 장바구니 비우기 완료
  /cart/items/{cartItemId}:
    patch:
      summary: 장바구니 상품 수량 변경
      tags: [Cart]
      security:
        - bearerAuth: []
      parameters:
        - name: cartItemId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                quantity:
                  type: integer
              required: [quantity]
      responses:
        '200':
          description: 수량 변경 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CartItem'
    delete:
      summary: 장바구니 품목 삭제
      tags: [Cart]
      security:
        - bearerAuth: []
      parameters:
        - name: cartItemId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: 장바구니 항목 삭제 완료
  # 주문
  /orders:
    get:
      summary: 주문 목록 조회 (사용자)
      tags: [Order]
      security:
        - bearerAuth: []
      responses:
        '200':
          description: 주문 목록
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderListResponse'
    post:
      summary: 주문 생성
      tags: [Order]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: 주문 생성됨
  /orders/{orderNumber}:
    get:
      summary: 주문 상세 조회
      tags: [Order]
      security:
        - bearerAuth: []
      parameters:
        - name: orderNumber
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 주문 상세
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderDetailResponse'
  /orders/{orderNumber}/cancel:
    post:
      summary: 주문 취소
      tags: [Order]
      security:
        - bearerAuth: []
      parameters:
        - name: orderNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        '200':
          description: 주문 취소 요청 완료
  /orders/{orderNumber}/refund:
    post:
      summary: 환불 요청
      tags: [Order]
      security:
        - bearerAuth: []
      parameters:
        - name: orderNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        '200':
          description: 환불 요청 완료
  /admin/orders:
    get:
      summary: 주문 목록 조회 (관리자)
      tags: [Order-Admin]
      parameters:
        - in: query
          name: status
          schema:
            type: string
        - in: query
          name: from
          schema:
            type: string
            format: date
        - in: query
          name: to
          schema:
            type: string
            format: date
        - in: query
          name: userName
          schema:
            type: string
      responses:
        '200':
          description: 관리자 주문 목록
  /admin/orders/{orderNumber}/refund/approve:
    post:
      summary: 환불 승인 또는 거절
      tags: [Order-Admin]
      parameters:
        - name: orderNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        '200':
          description: 환불 처리 완료
  /admin/orders/{orderNumber}/delivery-status:
    patch:
      summary: 배송 상태 변경
      tags: [Order-Admin]
      parameters:
        - name: orderNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                trackingNumber:
                  type: string
                companyCode:
                  type: string
      responses:
        '200':
          description: 배송 상태 변경 완료
  
  
  # 결제
  /payments/methods:
    get:
      summary: 결제 수단 목록 조회
      tags: [Payment]
      responses:
        '200':
          description: 결제 수단 목록
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PaymentMethod'
  /payments:
    post:
      summary: 결제 요청
      tags: [Payment]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                orderNumber:
                  type: string
                paymentMethod:
                  type: string
      responses:
        '200':
          description: 결제 요청 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentResponse'
  /payments/{paymentNumber}:
    get:
      summary: 결제 내역 조회
      tags: [Payment]
      security:
        - bearerAuth: []
      parameters:
        - name: paymentNumber
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 결제 상세
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentResponse'
  /admin/payments:
    patch:
      summary: 결제 목록 조회 (관리자)
      tags: [Payment-Admin]
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: method
          in: query
          schema:
            type: string
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: orderNumber
          in: query
          schema:
            type: string
      responses:
        '200':
          description: 결제 목록
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentListResponse'
  /admin/payments/{paymentNumber}/status:
    patch:
      summary: 결제 상태 수동 변경 (관리자)
      tags: [Payment-Admin]
      parameters:
        - name: paymentNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                reason:
                  type: string
      responses:
        '200':
          description: 상태 변경 완료
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentStatusChangeResponse'
  /admin/payments/{paymentNumber}/cancel:
    post:
      summary: 결제 취소 또는 환불 처리 (관리자)
      tags: [Payment-Admin]
      parameters:
        - name: paymentNumber
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        '200':
          description: 결제 취소/환불 완료
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentCancelResponse'
  
  # 리뷰
  /products/{productId}/reviews:
    get:
      summary: 상품별 리뷰 조회
      tags: [Review]
      parameters:
        - name: productId
          in: path
          required: true
          schema:
            type: integer
        - name: page
          in: query
          schema:
            type: integer
        - name: size
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: 상품 리뷰 목록
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductReviewListResponse'
  /users/me/reviews:
    get:
      summary: 본인 작성 리뷰 목록
      tags: [Review]
      security:
        - bearerAuth: []
      parameters:
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
        - name: size
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: 사용자 리뷰 목록
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserReviewListResponse'
  /reviews:
    post:
      summary: 리뷰 작성
      tags: [Review]
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                orderNumber:
                  type: string
                orderItemId:
                  type: integer
                rating:
                  type: integer
                content:
                  type: string
      responses:
        '201':
          description: 리뷰 작성 성공
          content:
            application/json:
              schema:
                type: object
                properties:
                  reviewId:
                    type: integer
                  createdAt:
                    type: string
                    format: date-time
  /reviews/{reviewId}:
    put:
      summary: 리뷰 수정
      tags: [Review]
      security:
        - bearerAuth: []
      parameters:
        - name: reviewId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                rating:
                  type: integer
                content:
                  type: string
      responses:
        '200':
          description: 리뷰 수정 완료
          content:
            application/json:
              schema:
                type: object
                properties:
                  updatedAt:
                    type: string
                    format: date-time
    delete:
      summary: 리뷰 삭제
      tags: [Review]
      security:
        - bearerAuth: []
      parameters:
        - name: reviewId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: 삭제 완료
  /admin/reviews:
    get:
      summary: 관리자 리뷰 목록 조회
      tags: [Review-Admin]
      parameters:
        - name: rating
          in: query
          schema:
            type: integer
        - name: keyword
          in: query
          schema:
            type: string
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
        - name: size
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: 관리자 리뷰 목록
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AdminReviewListResponse'
  /admin/reviews/{reviewId}/reply:
    post:
      summary: 관리자 답변 작성/수정
      tags: [Review-Admin]
      parameters:
        - name: reviewId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                content:
                  type: string
      responses:
        '200':
          description: 답변 등록됨
          content:
            application/json:
              schema:
                type: object
                properties:
                  replyId:
                    type: integer
                  reviewId:
                    type: integer
                  createdAt:
                    type: string
                    format: date-time
                  updatedAt:
                    type: string
                    format: date-time
    delete:
      summary: 관리자 답변 삭제
      tags: [Review-Admin]
      parameters:
        - name: reviewId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: 답변 삭제 완료

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    # 상품
    Category:
      type: object
      properties:
        id:
          type: integer
        label:
          type: string
    ProductStatus:
      type: object
      properties:
        code:
          type: string
          enum: [ON_SALE, STOPPED, HIDDEN]
        label:
          type: string
    ProductRequest:
      type: object
      required:
        - name
        - price
        - quantity
        - thumbnail
        - detailImage
        - intensityId
        - cupSizeId
      properties:
        name:
          type: string
        price:
          type: integer
        quantity:
          type: integer
        thumbnail:
          type: string
          format: uri
        detailImage:
          type: string
          format: uri
        intensityId:
          type: integer
        cupSizeId:
          type: integer
    ProductUpdateRequest:
      allOf:
        - $ref: '#/components/schemas/ProductRequest'
        - type: object
          required:
            - status
          properties:
            status:
              type: string
              enum: [ON_SALE, STOPPED, HIDDEN]
    ProductResponse:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        price:
          type: integer
        quantity:
          type: integer
        thumbnail:
          type: string
          format: uri
        detailImage:
          type: string
          format: uri
        intensity:
          $ref: '#/components/schemas/Category'
        cupSize:
          $ref: '#/components/schemas/Category'
        status:
          $ref: '#/components/schemas/ProductStatus'
        isSoldOut:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
    
    # 장바구니
    CartItem:
      type: object
      properties:
        cartItemId:
          type: integer
        productId:
          type: integer
        name:
          type: string
        price:
          type: integer
        quantity:
          type: integer  # 사용자가 담은 수량
        stockQuantity:
          type: integer  # 실제 재고
        thumbnail:
          type: string
          format: uri
        isSoldOut:
          type: boolean
        isAvailable:
          type: boolean  # (status == ON_SALE && deleted_at is null)
        requiresQuantityAdjustment:
          type: boolean  # 재고 부족 시 수량 조정 유도
    CartResponse:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/CartItem'
        totalPrice:
          type: integer
    
    # 주문
    CreateOrderRequest:
      type: object
      properties:
        cartItemIds:
          type: array
          items:
            type: integer
        items:
          type: array
          items:
            type: object
            properties:
              productId:
                type: integer
              quantity:
                type: integer
        deliveryAddressId:
          type: integer
          nullable: true
        deliveryAddress:
          type: object
          properties:
            recipientName:
              type: string
            recipientPhone:
              type: string
            zipCode:
              type: string
            address1:
              type: string
            address2:
              type: string
        deliveryMessage:
          type: string
        paymentMethod:
          type: string
    OrderListResponse:
      type: object
      properties:
        content:
          type: array
          items:
            type: object
            properties:
              orderNumber:
                type: string
              status:
                type: object
                properties:
                  code:
                    type: string
                  label:
                    type: string
              orderedAt:
                type: string
                format: date-time
              originalPrice:
                type: integer
              totalDiscount:
                type: integer
              totalPrice:
                type: integer
              items:
                type: array
                items:
                  type: object
                  properties:
                    productId:
                      type: integer
                    name:
                      type: string
                    thumbnail:
                      type: string
                      format: uri
                    price:
                      type: integer
                    quantity:
                      type: integer
        page:
          type: integer
        size:
          type: integer
        totalPages:
          type: integer
        totalElements:
          type: integer
    OrderDetailResponse:
      type: object
      properties:
        orderNumber:
          type: string
        user:
          type: object
          properties:
            externalId:
              type: string
            name:
              type: string
        status:
          type: object
          properties:
            code:
              type: string
            label:
              type: string
        orderedAt:
          type: string
          format: date-time
        paymentNumber:
          type: string
        paymentStatus:
          type: object
          properties:
            code:
              type: string
            label:
              type: string
        paymentMethod:
          type: string
        paidAt:
          type: string
          format: date-time
        originalPrice:
          type: integer
        itemDiscountTotal:
          type: integer
        orderDiscountTotal:
          type: integer
        totalDiscount:
          type: integer
        totalPrice:
          type: integer
        orderDiscounts:
          type: array
          items:
            type: object
            properties:
              type:
                type: string
              name:
                type: string
              amount:
                type: integer
              couponCode:
                type: string
        items:
          type: array
          items:
            type: object
            properties:
              productId:
                type: integer
              name:
                type: string
              thumbnail:
                type: string
              price:
                type: integer
              quantity:
                type: integer
              originalPrice:
                type: integer
              discountAmount:
                type: integer
              finalPrice:
                type: integer
              discounts:
                type: array
                items:
                  type: object
                  properties:
                    type:
                      type: string
                    name:
                      type: string
                    amount:
                      type: integer
                    couponCode:
                      type: string
        deliveryAddress:
          type: object
          properties:
            recipientName:
              type: string
            recipientPhone:
              type: string
            zipCode:
              type: string
            address1:
              type: string
            address2:
              type: string
        deliveryMessage:
          type: string
        deliveryTracking:
          type: object
          properties:
            companyCode:
              type: string
            companyName:
              type: string
            trackingNumber:
              type: string
            trackingUrl:
              type: string
        deliveryHistory:
          type: array
          items:
            type: object
            properties:
              status:
                type: string
              label:
                type: string
              updatedAt:
                type: string
                format: date-time
        statusHistory:
          type: array
          items:
            type: object
            properties:
              type:
                type: string
              status:
                type: string
              updatedAt:
                type: string
                format: date-time
        cancellable:
          type: boolean
        cancelRequested:
          type: boolean
        cancelReason:
          type: string
        canceledAt:
          type: string
          format: date-time
        refundRequested:
          type: boolean
        refundReason:
          type: string
        refundRequestedAt:
          type: string
          format: date-time
        refunded:
          type: boolean
        refundedAt:
          type: string
          format: date-time
        reviewable:
          type: boolean
        reviewWritten:
          type: boolean
        invoiceUrl:
          type: string

    # 결제
    PaymentMethod:
      type: object
      properties:
        code:
          type: string
        label:
          type: string
    PaymentResponse:
      type: object
      properties:
        paymentNumber:
          type: string
        orderNumber:
          type: string
        status:
          type: object
          properties:
            code:
              type: string
            label:
              type: string
        paymentMethod:
          type: string
        paidAt:
          type: string
          format: date-time
        totalPrice:
          type: integer
    PaymentStatusChangeResponse:
      type: object
      properties:
        paymentNumber:
          type: string
        orderNumber:
          type: string
        status:
          type: object
          properties:
            code:
              type: string
            label:
              type: string
        updatedAt:
          type: string
          format: date-time
    PaymentCancelResponse:
      type: object
      properties:
        paymentNumber:
          type: string
        orderNumber:
          type: string
        status:
          type: object
          properties:
            code:
              type: string
            label:
              type: string
        cancelReason:
          type: string
        cancelRequestedAt:
          type: string
          format: date-time
        cancelApprovedAt:
          type: string
          format: date-time
    PaymentListResponse:
      type: object
      properties:
        content:
          type: array
          items:
            type: object
            properties:
              paymentNumber:
                type: string
              orderNumber:
                type: string
              userName:
                type: string
              status:
                type: object
                properties:
                  code:
                    type: string
                  label:
                    type: string
              paymentMethod:
                type: string
              paidAt:
                type: string
                format: date-time
              totalPrice:
                type: integer
        page:
          type: integer
        size:
          type: integer
        totalPages:
          type: integer
        totalElements:
          type: integer
    
    # 리뷰
    ProductReviewListResponse:
      type: object
      properties:
        averageRating:
          type: number
          format: float
        ratingDistribution:
          type: object
          additionalProperties:
            type: integer
        reviews:
          type: array
          items:
            $ref: '#/components/schemas/ReviewWithAdminReply'
        page:
          type: integer
        size:
          type: integer
        totalPages:
          type: integer
        totalElements:
          type: integer
    UserReviewListResponse:
      type: object
      properties:
        content:
          type: array
          items:
            allOf:
              - $ref: '#/components/schemas/ReviewWithAdminReply'
              - type: object
                properties:
                  productId:
                    type: integer
                  productName:
                    type: string
                  productThumbnail:
                    type: string
        page:
          type: integer
        size:
          type: integer
        totalPages:
          type: integer
        totalElements:
          type: integer
    AdminReviewListResponse:
      type: object
      properties:
        content:
          type: array
          items:
            type: object
            properties:
              reviewId:
                type: integer
              user:
                type: object
                properties:
                  externalId:
                    type: string
                  nickname:
                    type: string
              product:
                type: object
                properties:
                  productId:
                    type: integer
                  name:
                    type: string
              order:
                type: object
                properties:
                  orderNumber:
                    type: string
                  orderedAt:
                    type: string
                    format: date-time
              orderItemId:
                type: integer
              rating:
                type: integer
              content:
                type: string
              createdAt:
                type: string
                format: date-time
              adminReply:
                $ref: '#/components/schemas/AdminReply'
        page:
          type: integer
        size:
          type: integer
        totalPages:
          type: integer
        totalElements:
          type: integer
    ReviewWithAdminReply:
      type: object
      properties:
        reviewId:
          type: integer
        nickname:
          type: string
        rating:
          type: integer
        content:
          type: string
        createdAt:
          type: string
          format: date-time
        adminReply:
          $ref: '#/components/schemas/AdminReply'
    AdminReply:
      type: object
      nullable: true
      properties:
        content:
          type: string
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
```
